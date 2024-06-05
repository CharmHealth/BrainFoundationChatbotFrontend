import React, { useState } from 'react';
import axios from 'axios';
// import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
// import YouTube from 'react-youtube';

// const answer3 = [
//   {
//     text: `Edward Quadros, PhD, is a Research Professor at SUNY – Downstate in the Departments of Medicine and Cell Biology. His research interests include biochemical and molecular aspects of vitamin B12/folate absorption, transport and metabolism; Genetic abnormalities of vitamin B12/folate dependent pathways; Cellular and metabolic consequences of vitamin B12 and folate deficiencies; Vitamin B12, folate and homocysteine metabolism in the elderly population with cardiovascular disease and cognitive disorders including Alzheimer’s dementia; Neuropathology of vitamin B12 and folate deficiency; B12, folate status and DNA methylation in the brain.

// Another area of research actively being pursued in Dr. Quadros' laboratory is the association of folate receptor autoimmunity with neural tube defect pregnancy and cerebral folate deficiency. Current research is focused on fetal and neonatal brain development and the role of folate and B12 in this process.

// Dr. Quadros has established a strong link between an autoimmune disorder that produces autoantibodies against the folate receptor alpha, a membrane receptor involved in folate transport to the fetus and to the brain. Extensive research in Dr. Quadros’ laboratory is aimed at understanding the cause and effects of this autoimmune disorder and how best to prevent and treat the pathologic consequences.

// Dr. Quadros holds a BSc in Chemistry from the University of Poona, a MSc in Applied Biology from the University of Bombay and a PhD in Biochemistry from the University of London.

// This talk was part of Synchrony 2021 Online Symposium - 'From Bench to Biopharma', organised by the The BRAIN Foundation in partnership with UC Davis MIND Institute and CalTech.`,
//   }
// ];

const context = [
  {
    videoId: '3DruLBCFxFE',
    videoLink: 'https://www.youtube.com/watch?v=3DruLBCFxFE',
    opts: {
      height: '90',
      width: '160',
      playerVars: {
        autoplay: 1,
      },
    },
    videoName: 'Folates, Autoantibodies and the Connection to Autism - Edward Quadros PhD, SUNY @Synchrony2021',
    videoDesc: `Edward Quadros, PhD, is a Research Professor at SUNY – Downstate in the Departments of Medicine and Cell Biology. His research interests include biochemical and molecular aspects of vitamin B12/folate absorption, transport and metabolism; Genetic abnormalities of vitamin B12/folate dependent pathways; Cellular and metabolic consequences of vitamin B12 and folate deficiencies; Vitamin B12, folate and homocysteine metabolism in the elderly population with cardiovascular disease and cognitive disorders including Alzheimer’s dementia; Neuropathology of vitamin B12 and folate deficiency; B12, folate status and DNA methylation in the brain.

Another area of research actively being pursued in Dr. Quadros' laboratory is the association of folate receptor autoimmunity with neural tube defect pregnancy and cerebral folate deficiency. Current research is focused on fetal and neonatal brain development and the role of folate and B12 in this process.

Dr. Quadros has established a strong link between an autoimmune disorder that produces autoantibodies against the folate receptor alpha, a membrane receptor involved in folate transport to the fetus and to the brain. Extensive research in Dr. Quadros’ laboratory is aimed at understanding the cause and effects of this autoimmune disorder and how best to prevent and treat the pathologic consequences.

Dr. Quadros holds a BSc in Chemistry from the University of Poona, a MSc in Applied Biology from the University of Bombay and a PhD in Biochemistry from the University of London.

This talk was part of Synchrony 2021 Online Symposium - 'From Bench to Biopharma', organised by the The BRAIN Foundation in partnership with UC Davis MIND Institute and CalTech.`,
  }
];

export default function Header() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState("hey");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(`https://90088w8q0l.execute-api.us-east-1.amazonaws.com/api/answerQuestion/?query=${encodeURIComponent(question)}`);
      console.log("res ---> ", res)
      setResponse(res.data);
      console.log("Response first: ", response)
      console.log("Response ---> ", response.response)
    } catch (error) {
      console.error('Error fetching the answer:', error);
      setResponse({ text: 'There was an error fetching the answer. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-screen justify-between w-full isolate overflow-hidden bg-gray-900 py-8 sm:py-8 lg:py-8">
      <div className="w-full items-center">
        <form onSubmit={handleSubmit} className="mt-6 mx-auto flex max-w-8xl justify-around gap-x-4 px-10 md:px-60 lg:px-80">
          <label htmlFor="question" className="sr-only">
            Ask me a question
          </label>
          <input
            id="question"
            name="text"
            type="text"
            autoComplete="text"
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="What are the colors for treatable pathways?"
            value={question}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
        <p className="mt-4 text-lg leading-8 text-gray-300">AI-powered search & chat for The Brain Foundation website.</p>
            <div className="w-full px-10 md:px-60 lg:px-80">
              {loading ? (
                <div className="flex justify-center items-center h-60">
                  <div className="spinner w-16 h-16 border-4 border-dashed rounded-full"></div>
                </div>
              ) : (
                response && (
                  <div className="mt-4 mx-auto overflow-auto rounded-md border-1 px-10 py-5 text-slate-400 shadow-sm text-md sm:text-sm sm:leading-6 ring-1 text-lg ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    {response.response}
                  </div>
                )
              )}
            </div>
        <div className="w-full px-10 md:px-60 lg:px-80">
          {context.map((item) => (
            <div key={item.videoId} className="mt-4 mx-auto flex justify-around overflow-auto rounded-md border-0 h-25 md:h-25 lg:h-25 bg-white/5 px-5 py-5 text-slate-400 shadow-sm ring-1 text-lg ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <div className="flex-col">
                <a href={item.videoLink} target="_blank" rel="noopener noreferrer">
                  <img className="rounded-md" src={`https://i.ytimg.com/vi/${item.videoId}/default.jpg`} width={150} height={50} alt={item.videoName} />
                </a>
              </div>
              <div className="flex-col px-5">
                <h1 className="text-lg">{item.videoName}</h1>
                {/* <div className="text-md">
                  {item.videoDesc}
                </div> */}
              </div>
              {/* <YouTube
                videoId={item.videoId}
                opts={item.opts}
                // className="mt-4 mx-auto overflow-auto rounded-md border-0 h-60 md:h-60 lg:h-80 bg-white/5 px-10 py-5 text-slate-400 shadow-sm ring-1 text-md ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              /> */}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff9780] to-[#899efc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
}
