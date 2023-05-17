import { Editor } from "@tinymce/tinymce-react";
import { editStaticPages } from "app/api/statics";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import PrimaryButton from "../Atoms/buttons/PrimaryButton";
import WhiteButton from "../Atoms/buttons/WhiteButton";
import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard";
import LoadingNireeka from "../Atoms/LoadingNireeka";

function EditorStatics({ onClose, setTopicInformation, topicInformation }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setTopicInformation((prevState) => {
      return { ...prevState, [e.target.name]: value };
    });
  };

  // editor
  const [editContent, setEditContent] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await editStaticPages({
        page_id: topicInformation.id,
        title: topicInformation.title,
        content: editContent,
      });

      if (response.status) {
        toast.success(response.message);
        setLoading(false);

        {
          !loading && onClose;
        }
        router.reload();
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log("Error in edit topic:", error);
      setLoading(true);
    }
  };

  return (
    <WhiteShadowCard className="rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <div className="w-full">
            <label className="text-sm font-light">editor</label>
            <textarea
              name="long_desc"
              label="full description"
              onChange={handleChange}
              value={topicInformation.content}
              className="hidden w-full h-[300px] overflow-y-auto scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-3 py-2 mt-1 rounded-md shadow-sm sm:text-sm bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {!editContent && (
            <div className="flex justify-center -z-2">
              <LoadingNireeka className="border-gray-600 w-14 h-14" />
            </div>
          )}
          <Editor
            apiKey={`yeui7lll16yv7vbfsgnlszfpqdkns4o7hg2a87bc52iyj3ku`}
            name="long_desc"
            textareaName="long_desc"
            initialValue={topicInformation.content}
            init={{
              // skin: "snow",
              height: 500,
              plugins:
                "powerpaste searchreplace casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker help formatpainter permanentpen charmap linkchecker emoticons advtable export print ",
              toolbar:
                "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat |code",
              hieght: 700,
              toolbar_sticky: true,
              icons: "thin",
              content_style: `
            body {
                background: #fff;
            }
            
            @media (min-width: 840px) {
                html {
                    background: white;
                    min-height: 100%;
                    padding: 1rem
                 }
                body {
                    background-color: #fff;
                    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
                    box-sizing: border-box;
                    margin: 1rem auto 0;
                    max-width: 820px;
                    min-height: calc(100vh - 1rem);
                    padding:4rem 6rem 6rem 6rem
                 }
             }
            `,
            }}
            onEditorChange={(newText) => setEditContent(newText)}
          />
        </div>
      </form>
      <div className="flex justify-end mt-6 space-x-3">
        <WhiteButton
          onClick={() => {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            onClose();
          }}
          disabled={loading}
        >
          Cancel
        </WhiteButton>
        <PrimaryButton
          onClick={handleSubmit}
          disabled={!editContent}
          className="space-x-3 "
        >
          <span>{loading ? "Updating..." : "Edit"}</span>
        </PrimaryButton>
      </div>
    </WhiteShadowCard>
  );
}

export default EditorStatics;
