import style from './LandingPage.module.css'

const LandingPage = () => {
  return (
    <div className={style.landing_main}>
      <div className={style.init_button}>
      <a className={style.init_link} href="/pokemons">Pokédex</a>

      </div>
    </div>
  )
}

export default LandingPage