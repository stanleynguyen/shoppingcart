import * as React from "react"
import {v4 as uuidv4 } from "uuid"

import CareerItem from "./career-item";          // list item for each post

import {postsInit} from "../static/posts-init";  // Load ina fresh and original copy of data for posts

export default function CareerForm(props) {

  const pageMvnt = (pmvt) => {
      setIsLoading(true);
      setPage(page + pmvt);  //setPage may not finish updating page soon enough before stPostsPage begin
      setPostsPage(posts.slice((page+pmvt-1)*PAGESIZE,(page+pmvt)*PAGESIZE));  // so setPostsPage adjusts its page number itself, using pmvt
      setIsLoading(false);
  }


  // this function allows a value to be retrieved from sessionStorage using a key
  const usePersistedState = (storageKey, defaultValue) => {
    const [value, setValue] = React.useState(
      () => sessionStorage.getItem(storageKey) || defaultValue
    );
    React.useEffect(() => {
      sessionStorage.setItem(storageKey, value);
    }, [value, storageKey]);
    return [value, setValue];
  };


  const [key, setKey] = React.useState('');
  const [title, setTitle] = usePersistedState("jobTitle", "");
  const [level, setLevel] = React.useState("Entry");
  const [department, setDepartment] = usePersistedState("jobDepartment", "Engineering");
  const [headcount, setHeadcount] = React.useState(1);
  const [summary, setSummary] = React.useState("");

  const titleInputRef = React.useRef();

  const [page, setPage] = React.useState(1);                 // initialise to page 1
  const PAGESIZE = 5;
  const [posts, setPosts] = React.useState(JSON.parse(JSON.stringify(postsInit)));  // declare posts and load data from static
                                                                                    // setPosts is not used because it does not
                                                                                    // update posts in time for other processes to
                                                                                    // run properly.
  const [postsPage, setPostsPage] = React.useState(posts.slice((page-1)*PAGESIZE,page*PAGESIZE));  // load page 1 from posts

  const pageForI = (i) => {
    return ~~((i+PAGESIZE)/PAGESIZE);  // given item i in posts, return the page number to show that item
  }
  
  const clearForm = (clearAll) => {
    setKey("");
    setTitle(sessionStorage.getItem("jobTitle"));
    setLevel("");
    setDepartment(sessionStorage.getItem("jobDepartment"));
    setSummary("");
    setHeadcount(1);
    if (clearAll) {
      setTitle("");
      setDepartment("");
    }
    if (titleInputRef.current) {titleInputRef.current.focus();}
  }

  const editPost = (data) => {  // (data) is the key of the post: pull out the post from posts and put info Form for editing
    let i = 0
    for (i = 0; i<postsPage.length; i++) {
      if (postsPage[i]._id === data) {
          break
      }
    }
    setKey(data);
    setTitle(postsPage[i].title);
    setLevel(postsPage[i].level);
    setDepartment(postsPage[i].department);
    setSummary(postsPage[i].summary);
    setHeadcount(postsPage[i].headcount);
  };  

  const savePost = (data) => {   // (data) is the post from the Form, save the post to posts
    let i = 0
    if (data._id === "") {    // if key of the post is empty, this is a new post...
      data._id = uuidv4();
      posts.push(data);       //... append the new post to the end of posts.
      i = posts.length - 1;
    } else {                  // otherwise, look up the post in posts...
      for (i = 0; i<posts.length; i++) {
        if (posts[i]._id === data._id) {break;}
      }
      posts[i].title = title; //... and replace the changed fields.
      posts[i].level = level;
      posts[i].department = department;
      posts[i].summary = summary;
      posts[i].headcount = headcount;
    }
    setPage(pageForI(i));  // move to the page that the added/updated post should appear in
    setPostsPage(posts.slice((pageForI(i)-1)*PAGESIZE, (pageForI(i)*PAGESIZE)));
  };  

  const delePost = (data) => {  // (data) is the key to the post, delete the post
    let i = 0
    for (i = 0; i<posts.length; i++) {
      if (posts[i]._id === data) {posts.splice(i,1);break;}
    }
    if ((page-1)*PAGESIZE >= posts.length) {                // if item delete is the only item on the last page
      setPage(~~((posts.length+PAGESIZE-1) / PAGESIZE));    // move to last page
      setPostsPage(posts.slice((~~((posts.length+PAGESIZE-1) / PAGESIZE)-1)*PAGESIZE,~~((posts.length+PAGESIZE-1) / PAGESIZE)*PAGESIZE));    //
    } else {                                                // otherwise stay at current page
      setPostsPage(posts.slice((page-1)*PAGESIZE,page*PAGESIZE));
    }
  };  

  const [isLoading, setIsLoading] = React.useState(false);

  return (


    <div className="max-w-6xl mx-auto px-3 py-12 space-y-6">
      <div className="mb-8">
        <div>
          <h1 className="text-6xl mb-4 font-extrabold">Careers</h1>
          <div className="pl-1 text-gray-400">Auto Load Data Version</div>
        </div>
      </div>



      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-1/2">
          <form id="career-form" 
            onSubmit={
              (ev) => {
                ev.preventDefault();
                savePost({_id:key, title, level, department, summary, headcount});
                clearForm(false);
              }
            }>
            <div className="
                      bg-white
                      overflow-hidden
                      shadow
                      rounded-lg
                      divide-y divide-gray-200
                    ">
                <div className="px-4 py-5 sm:px-6 text-lg">Add Job Posting</div>
                <input type="text" name="key" id="key" readOnly hidden value={key} />

                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-5">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                      <label htmlFor="job-title" className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    sm:mt-px sm:pt-2
                                  ">
                        Job Title
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input type="text" name="job-title" id="job-title" required className="
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    focus:ring-pink-500 focus:border-pink-500
                                    border-gray-300
                                    rounded-md
                                  " value={title} ref={titleInputRef}
                          onChange={(ev) => {setTitle(ev.target.value)}} />
                      </div>
                    </div>
                  <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                    <label htmlFor="job-level" className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    sm:mt-px sm:pt-2
                                  ">
                        Level
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <select id="job-level" name="job-level" required className="
                                    block
                                    w-full
                                    pl-3
                                    pr-10
                                    py-2
                                    text-base
                                    border-gray-300
                                    focus:outline-none
                                    focus:ring-pink-500
                                    focus:border-pink-500
                                    sm:text-sm
                                    rounded-md
                                  " value={level} 
                          onChange={(ev) => {setLevel(ev.target.value)}} >
                        <option value="internship">Internship</option>
                        <option value="entry">Entry</option>
                        <option value="experienced">Experienced</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>
                  <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                    <label htmlFor="job-department" className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    sm:mt-px sm:pt-2
                                  ">
                        Department
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input type="text" name="job-department" id="job-department" required placeholder="e.g. Engineering" 
                        className="
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    focus:ring-pink-500 focus:border-pink-500
                                    border-gray-300
                                    rounded-md
                                  " value={department} 
                        onChange={(ev) => {setDepartment(ev.target.value)}} />
                    </div>
                  </div>
                  <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                    <label htmlFor="job-summary" className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    sm:mt-px sm:pt-2
                                  ">
                      Summary
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea id="job-summary" name="job-summary" rows="4" required className="
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    focus:ring-pink-500 focus:border-pink-500
                                    border border-gray-300
                                    rounded-md
                                  " value={summary} 
                        onChange={(ev) => {setSummary(ev.target.value)}}></textarea>
                    </div>
                  </div>

                  <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                    <label htmlFor="headcount" className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    sm:mt-px sm:pt-2
                                  ">
                      Headcount
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="relative w-32">
                        <button type="button" className="
                                    absolute
                                    left-0
                                    inset-y-0
                                    px-1.5
                                    text-gray-400
                                  " id="headcount-minus-btn"
                          disabled={headcount <= 1}
                          onClick={() => setHeadcount(headcount<=1?headcount:headcount-1)}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                          </svg>
                        </button>
                        <input type="number" name="headcount" id="headcount" required className="
                                    block
                                    w-full
                                    px-9
                                    text-center
                                    shadow-sm
                                    sm:text-sm
                                    focus:ring-pink-500 focus:border-pink-500
                                    border-gray-300
                                    rounded-md
                                  " value={headcount} 
                          onChange={(ev) => {let val=Number(ev.target.value);if (!isNaN(val)) {if (val<1) {val=1;} if (val>9) {val=9;} setHeadcount(val)}}} />
                        <button type="button" className="
                                    absolute
                                    right-0
                                    inset-y-0
                                    px-1.5
                                    text-gray-400
                                  " id="headcount-plus-btn"
                          disabled={headcount >= 9}
                          onClick={() => setHeadcount(headcount>=9?9:headcount+1)}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                        </button>
                      </div>
                      <div id="headcount-error" className="text-red-500 text-xs pt-1 hidden">error message</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
              <button onClick={(ev) => {ev.preventDefault();clearForm(true);}}
                        className=" inline-flex
                                    justify-center
                                    py-2
                                    px-4
                                    border border-transparent
                                    shadow-sm
                                    text-sm
                                    font-medium
                                    rounded-md
                                    text-white
                                    bg-pink-600
                                    hover:bg-pink-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-pink-500
                                  ">
                    CLEAR
                </button>

                <button className=" inline-flex
                                    justify-center
                                    py-2
                                    px-4
                                    border border-transparent
                                    shadow-sm
                                    text-sm
                                    font-medium
                                    rounded-md
                                    text-white
                                    bg-pink-600
                                    hover:bg-pink-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-pink-500
                                  ">
                    {key===''?'ADD':'UPDATE'}
                </button>
              </div>
              <div className="px-4 py-4 sm:px-6 text-right">
              </div>
            </div>
          </form>
        </div>

        <div className="md:flex-1">
          <ul className="space-y-3">
            {postsPage &&
              postsPage.map((post) => (
                <CareerItem
                  name={post.title}
                  dept={post.department}
                  level={post.level}
                  key={post._id}
                  onEdit={() => editPost(post._id)}
                  onDele={() => delePost(post._id)}
                />
              ))
            }
          </ul>

          {posts.length > PAGESIZE && (  // hides the pagination buttons if total posts do not exceed PAGESIZE
            <div id="pagination-btns" className="flex justify-between items-center">
              <button id="prev-btn" type="button"
                      disabled={isLoading || page===1} 
                      onClick={() => {pageMvnt(-1);}}
              
                      className="
                        inline-flex
                        justify-center
                        py-2
                        px-4
                        border border-transparent
                        shadow-sm
                        text-sm
                        font-medium
                        rounded-md
                        text-white
                        bg-pink-600
                        hover:bg-pink-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-pink-500
                      ">
                {isLoading?"Loading...":"Previous"}
              </button>

              <button id="page-num" type="button" 
                      disabled
                      className="
                        inline-flex
                        justify-center
                        py-2
                        px-4
                        border border-transparent
                        shadow-sm
                        text-sm
                        font-medium
                        rounded-md
                        text-white
                        bg-pink-600
                        hover:bg-pink-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-pink-500
                      ">
                {`page ${page} of ${~~((posts.length+PAGESIZE-1)/PAGESIZE)}`}
              </button>


              <button id="next-btn" type="button" 
                      disabled={isLoading || (page*PAGESIZE >= posts.length)} 
                      onClick={() => {pageMvnt(1);}}
                      className="
                        inline-flex
                        justify-center
                        py-2
                        px-4
                        border border-transparent
                        shadow-sm
                        text-sm
                        font-medium
                        rounded-md
                        text-white
                        bg-pink-600
                        hover:bg-pink-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-pink-500
                      ">
                {isLoading?"Loading...":"Next"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>

)
}
