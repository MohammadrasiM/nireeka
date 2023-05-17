import { Editor } from "@tinymce/tinymce-react";
import { editTopic } from "app/api/help/editTopic";
import { getTopic } from "app/api/help/getTopic";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PrimaryButton from "../Atoms/buttons/PrimaryButton";
import WhiteButton from "../Atoms/buttons/WhiteButton";
import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard";

function AddTopic({
  onClose,
  categories,
  topicInformation,
  setTopicInformation,
}) {
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setTopicInformation((prevState) => {
      return { ...prevState, [e.target.name]: value };
    });
  };
  const [result, setResult] = useState(false);
  // editor
  const [editContent, setEditContent] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await editTopic({
        ...topicInformation,
        long_desc: editContent,
      });

      if (response.status) {
        toast.success(response.message);
        setResult(true);
        setLoading(false);
        {
          !loading && onClose;
        }
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log("Error in edit topic:", error);
      setLoading(true);
    }
  };
  const router = useRouter();

  useEffect(() => {
    if (result) {
      onClose();
      // window.location.reload();
      router.reload(window.location.pathname);
    }
  }, [result]);

  return (
    <WhiteShadowCard className="rounded-lg">
      <WhiteButton
        className="absolute px-1 py-1 text-3xl text-gray-500 bg-transparent border-none shadow-none top-2 right-2 hover:bg-white hover:text-red-500"
        onClick={() => {
          document.getElementsByTagName("body")[0].style.overflow = "auto";
          onClose();
        }}
        disabled={loading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </WhiteButton>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <div className="w-full">
            <label className="text-sm font-light">title</label>
            {/* <label className="text-sm font-light">title</label> */}
            <input
              onChange={handleChange}
              name="title"
              label="title"
              value={topicInformation.title}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="w-full">
            <label className="text-sm font-light">sub description</label>
            <input
              name="short_desc"
              label="sub description"
              onChange={handleChange}
              value={topicInformation.short_desc}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="w-full">
            <label className="text-sm font-light">sub category</label>

            <select
              onChange={handleChange}
              name="topic_category_id"
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {!!categories &&
                categories.map((item) => (
                  <option
                    selected={topicInformation.topic_category_id === item.id}
                    key={item.id}
                    value={item.id}
                  >
                    {item.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-full">
            <label className="text-sm font-light">editor</label>
            <textarea
              name="long_desc"
              label="full description"
              onChange={handleChange}
              value={topicInformation.long_desc}
              className="hidden w-full h-[300px] overflow-y-auto scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-3 py-2 mt-1 rounded-md shadow-sm sm:text-sm bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <Editor
            apiKey={`yeui7lll16yv7vbfsgnlszfpqdkns4o7hg2a87bc52iyj3ku`}
            name="long_desc"
            textareaName="long_desc"
            initialValue={topicInformation.long_desc}
            init={{
              skin: "snow",
              height: 500,
              plugins:
                "powerpaste searchreplace casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker help formatpainter permanentpen charmap linkchecker emoticons advtable export print ",
              toolbar:
                "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat |code",
              hieght: 700,
              toolbar_sticky: true,
              icons: "thin",
              skin: "material-classic",
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
          {/* {isLoading && <LoadingNireeka className="w-4 h-4" />} */}
          <span>{loading ? "Updating..." : "Edit Topic"}</span>
          {/* <span>Edit Topic</span> */}
        </PrimaryButton>
      </div>
    </WhiteShadowCard>
  );
}

export default AddTopic;
