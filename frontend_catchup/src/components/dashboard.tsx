import articleJson from "@/lib/articles.json";
import CommentBox from "@/components/comments";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Dashboard() {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 h-screen overflow-scroll">
        {/* summary boxes */}

        {articleJson.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              key={index}
              className="lg:w-full p-4 rounded-2xl bg-gray-100 border-2"
            >
              <div className="flex justify-between pr-10">
                <h2 className="font-bold">{articleJson[index].title}</h2>
                <div className="flex  items-center p-1 gap-2 ">
                  <h2 className="border border-gray-200 lowercase px-2 py-1 rounded-md bg-blue-500 text-white">
                    {articleJson[index].type}
                  </h2>
                  <h2 className="border border-gray-200 lowercase px-2 py-1 rounded-md bg-green-500 text-white">
                    LOW
                  </h2>
                </div>
              </div>
              {/*Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm">
                    Read more
                  </AccordionTrigger>
                  <AccordionContent>
                    <h3>{articleJson[index].time}</h3>
                    <TextGenerateEffect words={articleJson[index].summary} />
                    <div className="flex gap-1 mt-4">
                      <h1>author:</h1>
                      <h1>{articleJson[index].creator || ""}</h1>{" "}
                    </div>
                    <div className="flex gap-1">
                      Arxiv link:
                      <h2 className="text-blue-500">
                        <a href={articleJson[index].post_url}>
                          {articleJson[index].post_url}
                        </a>
                      </h2>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/*Accordion */}

              <h2 className="font-thin text-sm">
                {articleJson[index].time_created}
              </h2>
            </div>
          </div>
        ))}
        {/* summary boxes */}
      </div>
      {/* comment section*/}
      <CommentBox />
      {/* comment section*/}
    </div>
  );
}
