import Link from "next/link";

const TopicItem = ({item, hasBreadcrumb = true, onClick, className}) => {

  return (
      <div className={`w-full p-2 pb-8 mt-2 ${className}`} onClick={() => onClick(item.slug)}>
        <div className="px-6 py-8 bg-white border rounded-md border-customColorNIR hover:border-indigo-700">
            {hasBreadcrumb ? (
                <Link href={`/help-center/topic/${item.slug}`}>
                    <a className="text-xl font-light hover:text-customColorNIR">
                        {item.title}
                    </a>
                </Link>
            ) : (
                <span className="text-xl font-light">{item.title}</span>
            )}

          {/* </Link> */}
          <p className="py-2 mt-2 font-light">
            {/* {{ $topic->getDescription(130) }} */}
            {item.description}
          </p>
          {hasBreadcrumb && (
              <div className="mx-auto text-gray-500 text-md">
                <nav className="w-full px-1 py-1 rounded bg-grey-light">
                  <ol className="flex flex-wrap list-reset text-grey-dark">
                    <Link href="/help-center">
                      <a className="font-light cursor-pointer text-blue">
                        NIREEKA Power Bikes Help Center
                      </a>
                    </Link>
                    {/* @if(optional($topic->topicCategory)->parent) */}
                    {item.category_parent.title && (
                        <>
                          <li>
                            <span className="mx-2 font-light">{`>`}</span>
                          </li>
                          <li>
                            <Link href={`/help-center/category/${item.category_parent.url}`}>
                              <a className="font-light text-blue hover:text-customColorNIR">
                                {/* {{ $topic->topicCategory->parent->title }} */}
                                {item.category_parent.title}
                              </a>
                            </Link>
                          </li>
                        </>
                    )}

                    {/* @endif */}
                    <li>
                      <span className="mx-2 font-light">{`>`}</span>
                    </li>
                    <li>
                      <Link
                          href={`/help-center/category/${item.category.slug}`}
                      >
                        <a className="font-light text-gray-900 hover:text-customColorNIR">
                          {/* {{ optional($topic->topicCategory)->title }} */}
                          {item.category.title}
                        </a>
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
          )}
          <p className="px-1 py-2 font-light text-gray-700 agoTime">
            {/* {{ $topic->created_at->diffForHumans() }} */}
            {item.created_at}
          </p>
        </div>
      </div>
  );
};

export default TopicItem;

