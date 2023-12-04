import React from "react";

export const ChannelHeader = ({ channel }) => {
  return (
    <div className="mt-12 ml-12 flex items-center gap-4 border-2 border-black p-2 rounded-md w-[80%] shadow-[0_4px_1px_1px_rgba(0,0,0,0.3)]">
      <img
        src={channel?.thumbnails?.default.url}
        alt={channel?.title}
        className="w-12 h-12 object-contain rounded-[50%]"
      />
      <p className="font-bold text-[1.25rem]">{channel?.title}</p>
    </div>
  );
};

export const VideoHeader = ({ video }) => {
  return (
    <div className="mt-12 ml-12 flex-col justify-center gap-4">
      <img
        src={video?.thumbnails?.maxres.url}
        alt={"video thumbnail"}
        className="object-cover w-[420px] rounded-md"
      />
      <p className="mt-4 font-bold text-[1.25rem]">{video?.title}</p>
    </div>
  );
};
