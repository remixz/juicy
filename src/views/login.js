export default state => (
  <div className="login">
    <form>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      {state.isLoading ? (
        <button className="submit loading"> Logging in... </button>
      ) : (
        <button className="submit"> Log in </button>
      )}
    </form>
    <footer>
      <p> Made by <a href="https://twitter.com/zachbruggeman">Zach Bruggeman</a>. Add me on Peach: @bruggie</p>
    </footer>
  </div>
)
