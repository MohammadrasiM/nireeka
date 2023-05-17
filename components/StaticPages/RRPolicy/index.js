import React from "react";
function RrPolicy({data}) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}

export default RrPolicy;
