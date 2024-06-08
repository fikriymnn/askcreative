import Image from "next/image";
import parse from "html-react-parser";

export default function PoliciesDetail({ title, src, content }) {
  return (
    <>
      <div
        className={`md:mr-5 md:w-9/12 sm:w-8/12 w-10/12 shadow-2xl mb-10 border-t mt-5 md:mt-0 sm:mt-0`}
      >
        <h1 className="text-center my-10 md:text-2xl sm:text-xl text-base font-bold text-blue-600">
          {title}
        </h1>
        <div className="flex items-center w-full">
          {src && (
            <Image
              src={src}
              width={800}
              height={400}
              className="m-auto"
              alt="Image"
            />
          )}
        </div>

        <div className="w-10/12 m-auto mt-7 mb-7">
          <p className="md:text-base sm:text-sm text-xs">{parse(content)}</p>
        </div>
      </div>
    </>
  );
}

// h-[500px]
