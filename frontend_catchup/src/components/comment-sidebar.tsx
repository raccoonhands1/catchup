import '../app/globals.css'
interface Comment {
  text: string;
  author: string;
  time: string;
  likes: number;
  authorPosition: string;
}

type CommentBoxProps = {
  comments: Comment[];
};

export default function CommentBox({ comments }: CommentBoxProps) {
  return (
    <div className="flex gap-5 h-min w-[50rem] max-h-screen">
      <div className="p-2 md:pt-6 md:pl-6 md:pr-6 rounded-tl-md rounded-l-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col flex-1">
        <div className="flex flex-1 flex-col gap-2 overflow-y-scroll no-scrollbar">
          <h1 className="font-semibold text-lg">discussion</h1>
          <hr className="my-2 border-t-2 border-neutral-200 dark:border-neutral-700 w-full" />

          {comments.map((comment, index) => (
            <div key={index} className="flex gap-2 mb-4">
              <div
                key={index}
                className="w-full p-4 rounded-md bg-gray-100 inset-1"
              >
                <div className="flex-row flex items-center">
                  <h1 className="font-semibold text-sm">{comment.author}</h1>
                  <h1 className="text-xs px-1 text-slate-500 ">
                    {" • " + comment.authorPosition}
                  </h1>
                </div>
                <h2 className="">{comment.text}</h2>
                <h3 className="text-sm text-slate-500">{comment.time}</h3>
                {/* heart*/}
                <svg
                  className="mr-auto justify-right mt-2 cursor-pointer h-5 w-5"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
                </svg>
                {/* heart*/}
              </div>
            </div>
          ))}
        </div>
        <div className="inset-x-0 flex-row flex bottom-0">
          <div className="flex border-lg border-black bg-gray-200 min-h-10 rounded-xl flex-1 items-center">
            <input
              placeholder="add a comment..."
              className="flex-1 outline-none bg-transparent h-full px-6"
            ></input>
            {/* emoji*/}
            <svg
              className="w-6 h-6 text-gray-500 cursor-pointer mr-2"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
              <path d="M4.285 9.567a.5.5 0 01.683.183A3.498 3.498 0 008 11.5a3.498 3.498 0 003.032-1.75.5.5 0 11.866.5A4.498 4.498 0 018 12.5a4.498 4.498 0 01-3.898-2.25.5.5 0 01.183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
            {/* emoji*/}
            {/* image */}
            <svg
              className="w-6 h-6 text-gray-500 cursor-pointer mr-4"
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
            >
              <path d="M6.002 5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M2.002 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2h-12zm12 1a1 1 0 011 1v6.5l-3.777-1.947a.5.5 0 00-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 00-.63.062L1.002 12V3a1 1 0 011-1h12z" />
            </svg>
          {/* image */}
          </div>
          <button className="bg-black rounded-xl font-semibold px-8 text-white text-sm">
            POST
          </button>
        </div>
      </div>
    </div>
  );
}
