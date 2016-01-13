import { routes } from '../router'

export default (state) => {
  let page = routes[state.view].view(state)
  let header = routes[state.view].header(state)

  return state.firstLoad ? (
    <main>
      {header}
      <section className={`view view-${state.view}`}>
        {page}
      </section>
    </main>
  ) : (
    <main>
      <div className="loading">
        <div className="spinner">🍑</div>
      </div>
    </main>
  )
}
