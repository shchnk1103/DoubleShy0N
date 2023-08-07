'use client';

import Link from "next/link";
import React, {useRef, useState} from "react";

const Upload = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const [filename, setFilename] = useState('click here to upload excel...')
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.files[0].name)
  }

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setSubmitting(true);

    const inputFiles = inputFileRef.current;

    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");
    headers.append('Content-Disposition', `attachment; filename=${inputFiles.files[0].name}`)

    const formData = new FormData();
    formData.append('file', inputFiles.files[0]);

    if (inputFiles && inputFiles.files.length > 0) {
      try {
        const response = await fetch("https://django-api-topaz.vercel.app/api/upload/", {
          method: "POST",
          headers: headers,
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'output.xlsx');
          document.body.appendChild(link);
          link.click()
          link.parentNode.removeChild(link);

          console.log('success')
        } else {
          console.log(formData.get('file'))
          console.log(response.statusText);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }

    console.log('submit');
  }

  return (
    <section className={'w-full max-w-full flex-start flex-col'}>
      <h1 className={'head_text text-left w-full'}>
        <span className={'blue_gradient'}>Convert</span>
      </h1>

      <p className={'desc text-left max-w-md'}>
        Help you sort out complex tables quickly.
      </p>

      <form onSubmit={handleSubmit}
            className={'mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism dark:bg-gray-500/20 dark:border-gray-500 dark:shadow-gray-600/95 z-0'}
            encType={'multipart/form-data'}
      >
        <label htmlFor={'input-excel'}>
          <span className="font-semibold text-base text-gray-700 dark:text-gray-300">
            Excel File:
          </span>

          <div
            className={'w-full h-full mt-4 rounded-xl shadow-sm bg-white dark:bg-black/20 flex-center min-h-[250px] hover:shadow-xl transition-all hover:cursor-pointer text-gray-500 hover:text-gray-800 hover:transform hover:-translate-y-2'}>
              <span className="text-xl capitalize">
                {filename}
              </span>
          </div>

          <input
            ref={inputFileRef}
            name="input-excel"
            id="input-excel"
            accept="xlsx, xls, csv"
            type="file"
            required
            className="hidden opacity-0"
            onChange={handleInputChange}
          />
        </label>

        {/*Submit button*/}
        <div className={'flex-end mx-3 mb-5 gap-4'}>
          <Link href="/" className={'text-gray-500 text-sm'}>
            Cancel
          </Link>

          <button type={'submit'} disabled={filename == 'click here to upload excel...' || submitting}
                  className={'px-5 py-1.5 text-lg bg_blue_gradient rounded-full text-white'}>
            {submitting ? 'Converting...' : 'Convert'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Upload;