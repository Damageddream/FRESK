import Jumbotron from "../Jumbotron";
import ListaAktualnosci from "./ListaAktualnosci";
import news from '../../images/news.jpg'



const Aktualnosci = () => {
  const opis = {
    title: "Aktualności",
    photo: news,
  };

  return (
    <div data-testid='aktualnosci-1'>
      <Jumbotron title={opis.title} photo={opis.photo} />
      <ListaAktualnosci />
    </div>
  );
};

export default Aktualnosci;
