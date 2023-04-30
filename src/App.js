import React from "react";
import CommentHolder from "./Components/CommentHolder";
// import Reply from "./Components/Reply";
import CustomHook from "./Hooks/CustomHook";
import { data } from "./data.js"
import UserIcon from "./images/avatars/image-juliusomo.png";
function App() {
  const [commentData, setData] = React.useState(JSON.parse(localStorage.getItem("Comments")))
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(user)
    if (!user) {
      // console.log("NO USER")
      localStorage.setItem("user", JSON.stringify({ "userName": "juliusomo", "profileImage": UserIcon }))
    }
    if (!commentData) {
      // console.log("IN", data)
      localStorage.setItem("Comments", JSON.stringify(data[0].comments))
      setData(data[0].comments)
    }
  }, [])


  return (
    <div className="App ">
      <section className="wrapper">

        {/* all comments */}
        {
          commentData &&
          <CustomHook.Provider value={{commentData : commentData , setCommentData:setData}}>
            <div className="comment_holder">
              <CommentHolder/>
            </div>
            {/* <Reply /> */}
          </CustomHook.Provider>}
        {/* comment section to write comment */}
      </section>

    </div>
  );
}

export default App;
