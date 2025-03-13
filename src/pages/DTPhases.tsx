import { useNavigate } from 'react-router-dom';

const phases = [
  {
    id: '01',
    title: 'EMPATHIZE',
    text: 'To solve problems, we need to understand people and their needs. Empathizing means learning about others by observing, asking questions, and listening carefully.',
    bg: 'bg-empathize',
    textColor: 'text-define',
    bgCircle: 'bg-define',
    textCircle: 'text-empathize',
  },
  {
    id: '02',
    title: 'DEFINE',
    text: 'Now that you know what people need, it’s time to clearly define the problem. This helps you focus and find a solution that really works.',
    bg: 'bg-define',
    textColor: 'text-empathize',
    bgCircle: 'bg-empathize',
    textCircle: 'text-define',
  },
  {
    id: '03',
    title: 'IDEATE',
    text: 'This is where we let our creativity fly! In Ideate, you think up as many ideas as possible, even wild ones.',
    bg: 'bg-ideate',
    textColor: 'text-primary',
    bgCircle: 'bg-primary',
    textCircle: 'text-ideate',
  },
  {
    id: '04',
    title: 'PROTOTYPE',
    text: 'Now it’s time to turn your idea into something real! Prototyping means creating a simple version of your idea to see how it works.',
    bg: 'bg-prototype',
    textColor: 'text-test',
    bgCircle: 'bg-test',
    textCircle: 'text-prototype',
  },
  {
    id: '05',
    title: 'TEST',
    text: 'Testing lets you find out what people like about your prototype and what you could improve. You’re getting closer to an amazing solution!',
    bg: 'bg-test',
    textColor: 'text-prototype',
    bgCircle: 'bg-prototype',
    textCircle: 'text-test',
  },
];

export default function DesignThinkingPhases() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative flex justify-center px-4">
        <div className={'max-w-4xl w-full py-8'}>
          <h1
            className="text-4xl font-bold text-primary"
            style={{ fontFamily: 'Roboto Slab' }}
          >
            You're ready to start your design thinking adventure!
          </h1>
          <p
            className="mt-8 text-md text-primary font-light"
            style={{ fontFamily: 'Roboto Slab' }}
          >
            It's time to solve real-world problems using design thinking!
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-10">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className={`relative rounded-[20px] flex flex-col w-[220px] h-[293px] shadow-lg ${phase.bg} ${phase.textColor}`}
          >
            {/* Header */}
            <div
              className={`p-4 rounded-t-[20px] flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`${phase.bgCircle} w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0`}
                >
                  <span className={`${phase.textCircle} text-sm`}>
                    {phase.id}
                  </span>
                </div>
                <p className="text-left text-lg font-semibold">{phase.title}</p>
              </div>
            </div>

            {/* Body */}
            <div className="flex-grow p-4 text-sm text-end">{phase.text}</div>
          </div>
        ))}
      </div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-base-100 shadow-md py-4 flex items-center justify-between px-6 h-[88px]">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="btn btn-primary btn-outline w-24"
        >
          Back
        </button>

        {/* Start Activity Button */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => navigate('/empathize')}
            className="px-6 py-2 btn bg-primary text-base-100 border-primary hover:bg-primary hover:text-ideate hover:border-primary"
          >
            LET'S START
          </button>
        </div>
      </div>
    </>
  );
}

// export default function DesignThinkingPhases() {
//   return (
//     <>
//       <div className="relative flex justify-center px-4">
//         <div className={'max-w-4xl w-full py-8'}>
//           <h1
//             className="text-4xl font-bold text-primary"
//             style={{ fontFamily: 'Roboto Slab' }}
//           >
//             You're ready to start your design thinking adventure!{' '}
//           </h1>
//           <p
//             className="mt-8 text-md text-primary font-light"
//             style={{ fontFamily: 'Roboto Slab' }}
//           >
//             It's time to solve real-world problems using design thinking!
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-wrap justify-center gap-2 py-10">
//         {phases.map((phase) => (
//           <div
//             key={phase.id}
//             className={`relative rounded-[20px] flex flex-col w-[220px] h-[293px] shadow-lg ${phase.bg} ${phase.textColor}`}
//           >
//             {/* Header */}
//             <div
//               className={`p-4 rounded-t-[20px] flex items-center justify-between`}
//             >
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`${phase.bgCircle} w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0`}
//                 >
//                   <span className={`${phase.textCircle} text-sm`}>
//                     {phase.id}
//                   </span>
//                 </div>

//                 <p className="text-left text-lg font-semibold">{phase.title}</p>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="flex-grow p-4 text-sm text-end">{phase.text}</div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// import Box from '../components/Box';
// import ActivityPageLayout from '../components/layout/ActivityPageLayout';

// const phases = [
//   {
//     id: '01',
//     title: 'EMPATHIZE',
//     text: 'To solve problems, we need to understand people and their needs. Empathizing means learning about others by observing, asking questions, and listening carefully.',
//     bg: 'bg-empathize',
//     textColor: 'text-define',
//     bgCircle: 'bg-define',
//     textCircle: 'text-empathize',
//   },
//   {
//     id: '02',
//     title: 'DEFINE',
//     text: 'Now that you know what people need, it’s time to clearly define the problem. This helps you focus and find a solution that really works.',
//     bg: 'bg-define',
//     textColor: 'text-empathize',
//     bgCircle: 'bg-empathize',
//     textCircle: 'text-define',
//   },
//   {
//     id: '03',
//     title: 'IDEATE',
//     text: 'This is where we let our creativity fly! In Ideate, you think up as many ideas as possible, even wild ones.',
//     bg: 'bg-ideate',
//     textColor: 'text-primary',
//     bgCircle: 'bg-primary',
//     textCircle: 'text-ideate',
//   },
//   {
//     id: '04',
//     title: 'PROTOTYPE',
//     text: 'Now it’s time to turn your idea into something real! Prototyping means creating a simple version of your idea to see how it works.',
//     bg: 'bg-prototype',
//     textColor: 'text-test',
//     bgCircle: 'bg-test',
//     textCircle: 'text-prototype',
//   },
//   {
//     id: '05',
//     title: 'TEST',
//     text: 'Testing lets you find out what people like about your prototype and what you could improve. You’re getting closer to an amazing solution!',
//     bg: 'bg-test',
//     textColor: 'text-prototype',
//     bgCircle: 'bg-prototype',
//     textCircle: 'text-test',
//   },
// ];

// export default function DesignThinkingSteps() {
//   return (
//     <ActivityPageLayout
//       activity={
//         <div className="flex items-center">
//           <div className="relative flex py-10 h-96">
//             {phases.map((phase) => (
//               <div className={'relative rounded-[20px] flex flex-col h-full'}>
//                 <div
//                   className={`${phase.bg} ${phase.textColor} p-4 rounded-t-[20px] flex items-center justify-between relative`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`${phase.bgCircle} w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0`}
//                     >
//                       <span className={`${phase.textCircle} text-sm`}>
//                         {phase.id}
//                       </span>
//                     </div>

//                     <p
//                       className="text-left text-[15px] tracking-widest"
//                       style={{ fontFamily: 'Poppins' }}
//                     >
//                       {phase.title}
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   className={`${phase.bg} ${phase.textColor} border border-primary rounded-b-[20px] flex flex-col flex-grow`}
//                 >
//                   <div className="flex-grow p-4 text-end">{phase.text}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       }
//     />
//   );
// }
