import React from 'react'

const Comments = ({ comments, result }) => {
    return (
        <div className="mt-4">
            {result?.comment_with_emotion.map((comment, index) => (
                <div key={index} className="truncate my-6 flex flex-col items-start gap-4 bg-gradient-to-br from-main-pink gap-4 border-2 border-black p-2 rounded-md w-[80%] shadow-[0_4px_1px_1px_rgba(0,0,0,0.3)]">
                    <p className="truncate text-over font-semibold text-[1.25rem]">{comment[0]}</p>
                    <div className="flex gap-4 items-start">
                        {comment[1].map((emotion, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <p className="text-sm font-semibold">{emotion.name}</p>
                                <p className="text-sm font-semibold bg-white rounded-lg p-1 w-[48px] bg-gradient-to-tl from-[#B49AFF] to-[#05A3FF]">{parseFloat(emotion.score).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments