import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "../helpers/theme-context";
// import YoutubeIframe from "react-native-youtube-iframe";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const LibraryScreen = ({ route, navigation }: props) => {
  const [videoReady, setVideoReady] = useState(false);
  const videoIds = ["THivxQYsJ_U", "0GOUF8vNqzE"];
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "O câncer não é o fim",
      author: "Cláudia Pereira",
      content:
        "O caminho a ser percorrido desde o diagnóstico do câncer até a cura final é longo e cheio de altos e baixos. Neste livro, você encontrará histórias reais de pessoas incríveis que tiveram câncer e não desistiram. A cada história, você descobrirá como cada um, à sua maneira, fez desse longo caminho uma experiência de superação, não apenas com relação a doença em si, mas também no que diz respeito a descobertas maiores, tais como mudança de hábitos e encontro com a espiritualidade e com o amor-próprio, fatores indispensáveis para lutar e vencer, chegando ao final do caminho com a certeza de que O Câncer Não é o Fim!",
      link: "https://www.amazon.com.br/C%C3%A2ncer-N%C3%A3o-Fim-Hist%C3%B3rias-Supera%C3%A7%C3%A3o-ebook/dp/B09BDC5SSW",
      image: require("../../assets/cancer-nao-e-o-fim.jpeg"),
    },
    {
      id: 2,
      title: "Diário de um câncer",
      author: "Tatá Arrasa",
      content:
        "O livro “Diário de uma paciente com câncer” de Esther Rodrigues é um livro emocionante, que irá lhe envolver com uma linda história de dor, alegria, força e superação. Paciente oncológica, diagnosticada com câncer aos 28 anos, Esther nunca deixou a dor e o sofrimento levar seu lindo sorriso.",
      link: "https://www.amazon.com/-/es/Esther-Rodrigues-dos-Santos/dp/8543701600",
      image: require("../../assets/diario-de-um-cancer.jpeg"),
    },
    {
      id: 3,
      title: "Voê é mais forte que o câncer",
      author: "Susan Sorensem",
      content:
        "Você não está sozinha. Deus está sempre ao seu lado. Ele vai fortalecê-la mais do que você pode imaginar.O câncer causa medo e angústia em qualquer pessoal, por mais forte que ela seja. Se você recebeu este diagnóstico ou tem uma amiga ou familiar que está lutando contra a doença, você entende isto melhor do que ninguém. Além disso, você sabe que a doença tem de ser enfrentada, e isto não é uma tarefa fácil. A boa notícia é que você não tem de enfrentar o câncer sozinha, mas pode se apoiar na experiência de outras mulheres que passaram pela mesma situação.Você é mais forte do que o câncer é justamente uma coletânea de histórias de mulheres que enfrentaram a doença e, com espírito vitorioso, encontraram consolo e até alegria. Para essas mulheres, o câncer foi uma vírgula e não um ponto final em suas vidas. E por quê? Porque elas colocaram sua fé em Deus e Ele as fortaleceu de um moto que vai além de nossa compreensão. A leitura deste livro é uma constante lembrança de que você não está sozinha e de que você é muito mais forte do que o câncer.",
      link: "https://www.amazon.com.br/Voc%C3%AA-Mais-Forte-que-C%C3%A2ncer/dp/8560303642",
      image: require("../../assets/mais-forte-cancer.jpeg"),
    },
    {
      id: 4,
      title: "Mate seu câncer",
      author: "Dirceu Abdala",
      content:
        "Após quarenta anos de estudo, dedicação e convivência com muitos doentes e doenças, Dirceu Abdala lança a segunda edição de uma das suas grandes obras, Mate seu Câncer. Você encontrará aqui um guia que ensina sobre saúde e oferece um novo estilo de vida que traz longevidade. Conheça as causas do câncer, a doença do século, e como este mal está presente em todos os seres, basta uma situação de anormalidade física ou psíquica para que ele desperte. Depare-se com uma escrita fluida, leitura fácil e aprenda como evitar ou lidar com este mal. Encante-se com a profundidade deste estudo, a experiência trazida em cada página e a mudança que este livro proporcionará em sua vida. É possível evitar ou matar o câncer e muitas outras doenças! Saiba como, ao se encontrar com Dirceu e seus conhecimentos tão fundamentais para a atualidade nessas páginas fascinantes.",
      link: "https://www.amazon.com.br/Mate-C%C3%A2ncer-Morre-Cora%C3%A7%C3%A3o-Quem/dp/6550791219",
      image: require("../../assets/mate-o-seu-cancer.jpeg"),
    },
    {
      id: 5,
      title: "Há Muita vida além do câncer",
      author: "Mara de souza",
      content:
        " Como SER uma pessoa com câncer? Essa foi uma das primeiras perguntas que a Neuropsicanalista Mara de Souza se fez quando, em 2014, foi diagnosticada com Linfoma. Porém, logo percebeu que ninguém nasce sabendo e que não há manual de instrução para tal situação. Lidar com o diagnóstico, passar pelo tratamento e reestruturar a vida após esse furacão representava um enorme desafio. Mas, o que inicialmente parecia uma sentença de morte, se transformou em grandiosas lições de vida! Agora, saudável e agradecida, Mara divide conosco memórias, sentimentos e percepções sobre sua trajetória oncológica, abordando de forma leve, realista e bem-humorada um tema tão sério e delicado. Não é um relato sobre a doença. Trata-se de uma interessante e sensível narrativa sobre como a finitude despertou exponencialmente a consciência e a sede pelo bem viver. Afinal, como Mara felizmente entendeu: há muita vida além do câncer - basta ajustar o foco!",
      link: "https://www.amazon.com.br/H%C3%A1-Muita-Vida-Al%C3%A9m-Cancer/dp/655079062X",
      image: require("../../assets/vida-alem-cancer.jpeg"),
    },
    {
      id: 6,
      title: "5 coisas qu o câncer não me ensinou",
      author: "Mari Alexandre",
      content:
        "Você não sabe o que um paciente com câncer passa. Ninguém sabe. Quando pesquisamos sobre a doença encontramos diversos materiais sobre ciência, nomes difíceis e tratamentos. Mas e o protagonista dessa históriaO e-book 5 Coisas que o Câncer Não me Ensinou foi escrito em 2021 e traz, por meio de textos incríveis, a perspectiva de uma ex-paciente de câncer de mama com todos os seus devaneios e divagações que irão te aproximar dessa realidade, revolucionando o seu jeito de olhar para a vida.",
      link: "https://www.amazon.com/Coisas-que-C%C3%A2ncer-Ensinou-Portuguese-ebook/dp/B09LYY7ZNH",
      image: require("../../assets/5-coisas-cancer-nao-me-ensinou.jpeg"),
    },
    {
      id: 7,
      title: "Câncer outra visão",
      author: "Lair Ribeiro",
      content: "",
      link: "",
      image: require("../../assets/cancer-outra-visao.jpeg"),
    },
    {
      id: 8,
      title: "Câncer porque eu?",
      author: "Pauki Naoum",
      content:
        "Este livrotemas essenciais do novo cpc, trata das principais alterações no processo civil brasileiro e tem a proposta de ser diferente de tudo o que até agora se publicou no mercado brasileiro desde que o ncpc se tornou lei e iniciou a travessia do período de vacatio legis; é um livro curto, enxuto, objetivo, que enfrenta diretamente as alterações empreendidas pelo novo código, divididas por temas atribuídos aos respectivos autores. Sem digressões doutrinárias; sem discussões acadêmicas. Ambas, neste livro, não encontram espaço; o público-alvo é justamente o profissional, o aluno de pós-graduação ou do último ano de faculdade, ávidos a saber o que efetivamente mudou.",
      link: "https://www.amazon.com.br/Cancer-Por-Que-Respostas-Perguntas/dp/8541102629",
      image: require("../../assets/cancer-porque-eu.jpeg"),
    },
  ]);

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "11 Dicas para a Prevenção do Câncer",
      author: "Potencial Recursos Humanos",
      content:
        "Este artigo apresenta 11 dicas essenciais para minimizar as chances de desenvolver câncer, enfatizando a importância de hábitos saudáveis e medidas preventivas...",
      link: "https://potencialrecursoshumanos.com/11-dicas-para-a-prevencao-do-cancer",
      image: require("../../assets/1-article.jpg"),
    },
    {
      id: 2,
      title: "Avanços no Tratamento do Câncer",
      author:
        "Conselho Estadual de Secretários de Saúde de São Paulo (CONESSP)",
      content:
        "O artigo discute os recentes avanços no tratamento do câncer, destacando inovações tecnológicas e terapêuticas que têm melhorado a qualidade de vida dos pacientes.....",
      link: "https://conessp.org.br/2023/01/12/avancos-no-tratamento-do-cancer/",
      image: require("../../assets/2-article.jpg"),
    },
    {
      id: 3,
      title:
        "Pacientes com Câncer Criam Redes de Apoio ao Dividir Histórias de Superação na Internet",
      author: "Jornal O Globo",
      content:
        "Este artigo relata como pacientes com câncer têm utilizado a internet para compartilhar suas histórias de superação, criando redes de apoio e encorajamento mútuo.....",
      link: "https://oglobo.globo.com/brasil/pacientes-com-cancer-criam-redes-de-apoio-ao-dividir-historias-de-superacao-na-internet-21609600",
      image: require("../../assets/3-article.jpg"),
    },
    {
      id: 4,
      title: "Dia Mundial Contra o Câncer: A Prevenção é a Melhor Escolha",
      author: "Conselho Federal de Odontologia (CFO)",
      content:
        "Em alusão ao Dia Mundial Contra o Câncer, o artigo enfatiza a importância da prevenção e do diagnóstico precoce na luta contra a doença....",
      link: "https://website.cfo.org.br/dia-mundial-contra-o-cancer-a-prevencao-e-a-melhor-escolha/",
      image: require("../../assets/4-article.jpg"),
    },
    {
      id: 5,
      title: "Avanços Promissores no Tratamento do Câncer",
      author: "Dr. Leonardo Seyboth",
      content:
        "O Dr. Leonardo Seyboth aborda os avanços promissores no tratamento do câncer, destacando novas terapias e abordagens que têm mostrado eficácia significativa....",
      link: "https://drleonardoseyboth.com.br/avancos-promissores-no-tratamento-do-cancer/",
      image: require("../../assets/5-article.png"),
    },
    {
      id: 6,
      title:
        "As Cores da Saúde: Confira as Principais Campanhas Contra o Câncer",
      author: "Centro de Oncologia Campinas",
      content:
        "O artigo apresenta as principais campanhas de conscientização sobre diferentes tipos de câncer, destacando a importância da .....",
      link: "https://oncologia.com.br/noticias/cores-da-saude-campanhas/",
      image: require("../../assets/6-article.jpg"),
    },
    {
      id: 7,
      title: "Avanços Tecnológicos no Tratamento do Câncer",
      author: "SAÚDE É",
      content:
        "Este artigo explora os avanços tecnológicos recentes no tratamento do câncer, incluindo novas técnicas e equipamentos que têm ....",
      link: "https://saudee.com.br/avancos-tecnologicos-no-tratamento-do-cancer/",
      image: require("../../assets/Avancos-Tecnologicos.png"),
    },
    {
      id: 8,
      title: "Qual a diferença de câncer de pele melanoma e não melanoma?",
      author: "Dr. Leonardo Seybolth",
      content:
        "Embora a taxa de letalidade seja baixa, o carcinoma de células basais e o carcinoma de células escamosas, categorizados como cânceres de pele não melanoma, apresentam uma incidência ....",
      link: "https://www.popularlibros.com/libro/cancer-el-fin-de-un-mito-historias-reales-de-superacion_168184",
      image: require("../../assets/8-article.png"),
    },
  ]);

  const image = require("../../assets/cancer-porque-eu.jpeg");

  const youtubeChannels = [
    {
      id: 1,
      title: "Saúde e Bem-Estar",
      thumbnail: "https://source.unsplash.com/400x300/?health",
    },
    {
      id: 2,
      title: "Dicas para Pacientes Oncológicos",
      thumbnail: "https://source.unsplash.com/400x300/?doctor",
    },
  ];

  const openYoutubeChannel = (youtubeChannelName: string) => {
    const url = `${openYoutubeChannel}`;

    Linking.openURL(url).catch((err) =>
      alert("Não foi possível abrir o canal no youtube!")
    );
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-28 ${theme === "dark" ? "bg-neutral-900" : ""}`}
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View
          className={`border-[1px]  p-[3px] rounded-md  ${theme === "dark" ? "bg-neutral-900 border-zinc-600" : "bg-white border-zinc-200"}`}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={theme === "dark" ? "#fff" : "#505050"}
            ></Icon>
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center ${theme === "dark" ? "text-white" : "text-black"}  font-bold`}
        >
          Biblioteca
        </Text>
      </View>

      <View className="relative w-64 ms-4 my-4">
        <TextInput
          placeholder="Pesquisar..."
          className={` p-3 rounded-lg mb-4 ps-10 ${theme === "dark" ? "bg-white" : "bg-white"}`}
        />
        <View className="absolute left-3 top-2">
          <Icon name="search-outline" color={"#545454"} size={21} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-8 mb-6">
          <Text
            className={`text-lg font-semibold  mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            Livros Recomendados
          </Text>
          <Text className="text-zinc-500">
            Muita gente superou o cancer, aprenda com eles lendo esses livros e
            conhecendo novas histórias.
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="p-1"
          >
            {books &&
              books.map((book) => (
                <View
                  key={book.id}
                  className="bg-white flex-col justify-stretch items-center border-2 border-zinc-300 mt-4 p-2 rounded-3xl  h-[20rem] w-72 me-3 relative"
                >
                  <Image
                    style={{
                      width: "100%",
                      height: 160,
                      borderRadius: 20,
                      alignContent: "center",
                    }}
                    source={book.image}
                  />
                  <View className="self-start flex-col justify-center items-start mt-4 mb-[1px] ps-2">
                    <Text className="text-xl  text-black font-semibold text-wrap text-start">
                      {book.title}
                    </Text>
                    <Text className="text-zinc-500 text-start text-lg">
                      {book.author}
                    </Text>
                  </View>

                  <Text
                    onPress={() => {
                      navigation.navigate("BookSinglePageScreen", {
                        title: "single book page",
                        art: book,
                      });
                    }}
                    className="text-blue-500 bg-blue-400/20 font-light  rounded-2xl px-2 py-1 absolute bottom-3 right-3"
                  >
                    Saber Mais
                  </Text>
                </View>
              ))}
          </ScrollView>

          <Text
            className={`text-lg font-semibold  mt-10 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            Artigos Populares
          </Text>

          <Text className="text-zinc-500">
            Leia e se informe sobre os artigos mais recentes e novos artigos
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="p-1"
          >
            {articles &&
              articles.map((article) => (
                <View
                  key={article.id}
                  className="bg-white flex-col justify-stretch items-center  mt-4 p-2 h-[32rem] w-72 me-3 relative"
                >
                  <Image
                    style={{
                      width: "100%",
                      height: 160,
                      alignContent: "center",
                    }}
                    source={article.image}
                  />
                  <View className="self-start flex-col justify-center items-start mt-4 mb-[1px] ps-2">
                    <Text className="text-xl  text-black font-semibold text-wrap text-start">
                      {article.title}
                    </Text>
                    <Text className="text-zinc-500 text-start text-lg">
                      {article.author}
                    </Text>
                  </View>
                  <Text className="text-black px-2 mt-2 text-justify">
                    {article.content}
                  </Text>

                  <Text
                    onPress={() => {
                      Linking.openURL(article.link).catch((err) =>
                        alert("Não foi possívbel abrir o WhatsApp")
                      );
                    }}
                    className="text-zinc-500 bg-zinc-400/20 font-light  rounded-2xl px-4 py-2 absolute bottom-3 right-3"
                  >
                    Ler Artigo
                  </Text>
                </View>
              ))}
          </ScrollView>

          <Text
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}  mt-10 mb-2`}
          >
            Canais do YouTube
          </Text>
          <View>
            <Text className="text-zinc-500">
              Assista os melhores videos para te inspirares!
            </Text>
          </View>
          {/* <View className="mt-4 relative border-2 p-2 border-zinc-300 rounded-xl">
            <YoutubeIframe
              videoId="F1VlqUJlCko"
              height={180}
              onReady={() => setVideoReady(true)}
            />
            {!videoReady && (
              <ActivityIndicator
                className="absolute right-[50%] top-[50%]"
                color={theme === "dark" ? "white" : "black"}
              />
            )}
          </View>
          <View className="mt-4 relative border-2 p-2 border-zinc-300 rounded-xl">
            <YoutubeIframe
              videoId="FGSqYPrJDak"
              height={180}
              onReady={() => setVideoReady(true)}
            />
            {!videoReady && (
              <ActivityIndicator
                className="absolute right-[50%] top-[50%]"
                color={theme === "dark" ? "white" : "black"}
              />
            )}
          </View>
          <View className="mt-4 relative border-2 p-2 border-zinc-300 rounded-xl">
            <YoutubeIframe
              videoId="HuXbsrBYbKg"
              height={180}
              onReady={() => setVideoReady(true)}
            />
            {!videoReady && (
              <ActivityIndicator
                className="absolute right-[50%] top-[50%]"
                color={theme === "dark" ? "white" : "black"}
              />
            )}
          </View>
          <View className="mt-4 relative border-2 p-2 border-zinc-300 rounded-xl">
            <YoutubeIframe
              videoId="AhwSBUwevP0"
              height={180}
              onReady={() => setVideoReady(true)}
            />
            {!videoReady && (
              <ActivityIndicator
                className="absolute right-[50%] top-[50%]"
                color={theme === "dark" ? "white" : "black"}
              />
            )}
          </View>
          <View className="mt-4 relative border-2 p-2 border-zinc-300 rounded-xl">
            <YoutubeIframe
              videoId="Ep5MWBVd3xg"
              height={180}
              onReady={() => setVideoReady(true)}
            />
            {!videoReady && (
              <ActivityIndicator
                className="absolute right-[50%] top-[50%]"
                color={theme === "dark" ? "white" : "black"}
              />
            )}
          </View> */}

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://www.youtube.com/results?search_query=hist%C3%B3rias+inspiradoras+de+c%C3%A2ncer"
              ).catch((error: any) => alert("Link não disponível"));
            }}
          >
            <View
              className={`rounde-xl  p-3 rounded-lg mt-4 ${theme === "dark" ? "bg-white text-black" : "bg-zinc-500/40"}`}
            >
              <Text className="text-black font-bold  text-lg text-center">
                Ver Videos Youtube
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: 320,
    height: 180,
    flex: 1,
  },
});
