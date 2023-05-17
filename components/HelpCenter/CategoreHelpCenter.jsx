const CategoreHelpCenter = () => {
  return (
    <>
      <div className="bg-gray-100 ">
        <div className="w-11/12 mx-auto lg:w-8/12">
          <nav className="w-full py-12 rounded bg-grey-light">
            <ol className="flex list-reset text-grey-dark">
              <li>
                <a
                  href="{{ url('help-center') }}"
                  className="font-bold text-blue"
                >
                  {/* <img src="{{ asset('images/logo.jpg') }}" className="inline w-6 h-6 mr-2 rounded-full" alt="logo"> */}
                  Home
                </a>
              </li>
              {/* @if($category->parent) */}
              <li>
                <span className="mx-2 font-light">{`>`}</span>
              </li>
              <li>
                <a
                  href="{{ $category->parent->url() }}"
                  className="font-bold text-blue"
                >
                  {/* {{ $category->parent->title }} */}
                </a>
              </li>
              {/* @endif */}
              <li>
                <span className="mx-2 font-light">{`>`}</span>
              </li>
              <li>{/* {{ $category->title }} */}</li>
            </ol>
          </nav>
        </div>
        <div className="w-11/12 pb-5 mx-auto border-b border-gray-300 lg:w-8/12">
          <div className="flex-col pt-2 pb-5 text-left bg-gray-100 align-center">
            <h2 className="py-2 text-4xl">{/* {{ $category->title }} */}</h2>
            <p className="py-2 text-gray-500 text-md">
              {/* {{ $category->description }} */}
            </p>
          </div>
        </div>
        {/* @if($category->children()->whereHas('topics', function ($q){$q->where('is_published', 1);})->count() > 0)
        @foreach($category->children()->where('is_published' , 1)->get() as $item)
        @if(count($item->topics) > 0 and count($item->topics()->where('is_published' , 1)->get())) */}
        <div className="w-11/12 lg:w-8/12 mx-auto @if(!$loop->last)border-b border-gray-300 mt-2 pb-5 @endif">
          <div className="flex-col pt-1 pb-1 text-left bg-gray-100 lg:pt-4 align-center">
            <h2 className="px-1 py-2 text-2xl underline">
              <a href="{{ $item->url() }}" className="textHelpCenter">
                {/* {{ $item->title }} */}
              </a>
            </h2>
          </div>
          <div className="pb-5 bg-gray-100">
            <div className="flex flex-wrap w-full px-1 py-5 mx-auto lg:py-12 lg:px-4 lg:w-8/12 ">
              {/* <!-- Input container -->
                    @foreach($item->topics()->where('is_published' , 1)->limit(6)->get() as $topic) */}
              <div className="w-full p-3 md:w-1/2 ">
                <a href="{{ $topic->url() }}">
                  <div className="h-40 px-6 pt-8 bg-white border border-yellow-500 rounded-md">
                    <h6 className="text-xl">{/* {{ $topic->title }} */}</h6>
                    <p className="text-gray-500 text-md">
                      {/* {{ $topic->getDescription() }} */}
                    </p>
                  </div>
                </a>
              </div>
              {/* @endforeach */}
            </div>
          </div>

          {/* @if($item->topics()->count() > 6) */}
          <div className="flex-col pt-2 pb-5 text-left bg-gray-100 align-center">
            <button className="flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-customColorNIR hover:border-customColorNIR hover:bg-transparent hover:text-customColorNIR focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">
              <a href="{{ $item->allUrl() }}"> see all 15 article</a>
            </button>
          </div>
          {/* @endif */}
        </div>
        {/* @endif
        @endforeach
        @else
        @if(count($topics) > 0) */}
        <div className="w-11/12 mx-auto lg:w-8/12">
          <div className="flex-col pt-4 pb-1 text-left bg-gray-100 align-center">
            <h2 className="px-1 py-2 text-2xl underline">
              {/* {{ $category->title }} */}
            </h2>
          </div>
          <div className="pb-5 bg-gray-100">
            <div className="flex flex-wrap w-full px-1 py-5 mx-auto lg:py-12 lg:px-4 lg:w-8/12 ">
              {/* <!-- Input container -->
                    @foreach($topics as $topic) */}
              <div className="w-full p-3 md:w-1/2 ">
                <a href="{{ $topic->url() }}">
                  <div className="px-6 py-10 bg-white border-yellow-500 rounded-md border-">
                    <h6 className="text-xl">{/* {{ $topic->title }} */}</h6>
                    <p className="text-gray-500 text-md">
                      {/* {{ $topic->getDescription() }} */}
                    </p>
                  </div>
                </a>
              </div>
              {/* @endforeach */}
            </div>
          </div>

          {/* @if($topicsCount > 6) */}
          <div className="flex-col pt-2 pb-5 text-left bg-gray-100 align-center">
            <button className="flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-customColorNIR hover:border-customColorNIR hover:bg-transparent hover:text-customColorNIR focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">
              <a href="{{ $category->allUrl() }}"> see all 15 article</a>
            </button>
          </div>
          {/* @endif */}
        </div>
        {/* @endif
        @endif */}
      </div>

      {/* @endsection</> */}
    </>
  );
};

export default CategoreHelpCenter;
