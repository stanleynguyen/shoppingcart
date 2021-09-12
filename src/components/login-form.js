export default function LoginForm(props) {



    return (
  
  
  
  
  <body>
      <main className="bg-gray-50 p-6 sm:p-12 min-h-screen">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-6 bg-white shadow">
          <form>
            <div className="text-3xl mt-4 mb-8 font-extrabold text-center">Login</div>
            <div className="space-y-6">
              <div>
                <label for="username" className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <div className="mt-1">
                  <input type="text" name="username" id="username" required="" className="
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      focus:ring-pink-500 focus:border-pink-500
                      border-gray-300
                      rounded-md
                    " autofocus="" />
                </div>
              </div>
              <div>
                <label for="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-1">
                  <input type="password" name="password" id="password" required="" className="
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      focus:ring-pink-500 focus:border-pink-500
                      border-gray-300
                      rounded-md
                    " />
                </div>
              </div>
              <button type="submit" className="
                  w-full
                  inline-flex
                  justify-center
                  items-center
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
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </main>
      <script src="js/helpers.js"></script>
      <script src="js/script.js"></script>
      <script src="js/footer.js"></script>
    
  
  </body>
  
  )
}
