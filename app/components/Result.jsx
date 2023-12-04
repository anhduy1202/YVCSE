import React from 'react'

const Result = ({result}) => {
    return (
        <div className="mt-4 mb-2 flex flex-col gap-6 max-w-[420px]">
            {result?.result.map((item, index) => (
                <div key={index} className="truncate flex items-center gap-4 border-2 border-black p-2 rounded-md w-[80%] shadow-[0_4px_1px_1px_rgba(0,0,0,0.3)]">
                    <p className="font-bold text-[1.25rem]">{item[0]}</p>
                    <p className="font-bold text-[1.25rem]">{item[1]}</p>
                </div>
            ))}
        </div>
    )
}

export default Result