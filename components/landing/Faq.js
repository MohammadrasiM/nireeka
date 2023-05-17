import { Disclosure, Transition } from '@headlessui/react';
import React from 'react'
const faqs = [
    {
      id: 1,
      question: "To What countries do you ship?",
      answer: `We ship to the US, Canada, Japan, South Korea, Australia, China, Hong Kong, Singapore, Malaysia, Vietnam, New Zealand and all the European countries and South America. For Africa, we only ship to the port.`,
    },
    {
      id: 2,
      question: "Who is resposible for VAT&duties?",
      answer: `The customer is responsible for all the extra charges when the bike will be imported to his/her country. Please check your country rules and regulation for more details about importing ebikes.`,
    },
    {
      id: 3,
      question: "Do you delivery door to door?",
      answer: `Yes. You don't need to do anything after placing your order. We, using our forwarders will deliver the bike to your postal address.`,
    },
    {
      id: 4,
      question: "Are these bikes road legal?",
      answer: `Every country has different laws. The bikes comes with the following certificates and completly road legal in the US, EU and most of the countries. Standard: EN ISO 12100:2010, EN 15194:2017, EN 60204-1:2006+A1:2009+AC:2010 related to CE Directive(s): 2006/42/EC (Machinery) 2014/35/EU (Low Voltage) 2014/30/EU (Electromagnetic Compatibility).`,
    },
    {
      id: 5,
      question: "Will the frame have a unique serial/frame number?",
      answer: `Yes, each serial and frame number is unique.`,
    },
    {
      id: 6,
      question: "What is the delivery schedule?",
      answer: `Soon will be revealed.`,
    },
  ];
function Faq() {
  return (
    <div className="w-full h-auto flex items-center bg-Vector  mt-8 md:mt-28 ease-in transition-all">
    <div className="mx-auto w-full h-auto max-w-full md:max-w-[80%] rounded-2xl px-4  pb-12 text-lg">
      <h1 className="text-left text-4xl py-4 pl-6">FAQ</h1>
      {faqs.map((faq) => (
        <Disclosure  key={faq.id}>
          <div key={faq.id} className={"pb-2"}>
            <Disclosure.Button className="flex  flex-col w-full justify-between border rounded-2xl bg-white shadow-md px-4 md:px-16 py-6 mb-2 text-left font-medium text-gray-600">
              {faq.question}
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="text-gray-700 flex mb-2 text-left text-sm mt-4 leading-7">
                  {faq.answer}
                </Disclosure.Panel>
              </Transition>
            </Disclosure.Button>
          </div>
        </Disclosure>
      ))}
    </div>
  </div>
  )
}

export default Faq