import React, {useState} from 'react'
import {View, Text, Image} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'


export const Slider = () => {
    const slides = [
        {
            key: '1',
            title:'Seja Bem Vindo !',
            text:' Bem-vindo ao Deepcoffe, a sua plataforma inovadora de classificação de doenças em plantações de café!',
            imagem: require('../../../assets/test.png')
        
        },
        {
            key: '2',
            title:'Início',
            text:'Na tela de inicio você pode encontrar as classificação salvas realizar uma nova classificação ou acompanhas as notícias disponíveis em nosso sistema. ',
            imagem: require('../../../assets/test.png')
        
        },
        {
            key: '3',
            title:'Camera',
            text:'Após selecionar o botão de "+", você será direcionado para a tela da câmera, onde poderá escolher uma imagem da galeria ou fazer o upload.',
            imagem: require('../../../assets/test.png')
        
        },
        {
            key: '4',
            title:'Tela de classicação',
            text:'Após selecionar e confirmar a imagem você terá acesso a classificação e o possível tratamento para doença ou praga, podendo salvar essa classificação e ter acesso a ela no "Início"  ',
            imagem: require('../../../assets/test.png')
        
        },
    ]
    function renderSlides({item}){
        return(
            <View style={{flex:1, alignItems: 'center'}}>
                <Image
                source={item.imagem}
                style={{
                    marginTop:30,
                    resizeMode:'cover',
                    height: '65%',
                    width: '50%'
                }}
                />
                <Text
                style={{
                    paddingTop: 25,
                    paddingBottom: 10,
                    fontSize: 23,
                    color:'black',
                    alignItems: 'center',
                    fontWeight: "bold"
                
                }}
                >
                    {item.title}
                </Text>
                <Text                
                style={{
                    textAlign: 'center',
                    color: 'black',
                    paddingHorizontal: 25,
                    fontSize:15
                
                }}>
                    {item.text}
                </Text>
            </View>
        )
    }
    const [showHome, setShowHome] = useState(false)
    if(showHome){
        return <Text>Home</Text>
    }else{    
        return (
            <AppIntroSlider
            renderItem={renderSlides}
            data={slides}
            activeDotStyle={{
                backgroundColor: 'black',
                width: 30
            }}
            renderNextButton={()=> <Text style={{
                fontStyle: 'italic',
                color: "#800000",
                fontSize: 15,
                fontWeight: 'bold'
                
            }}>Proximo</Text>}
            renderDoneButton={()=> <Text style={{
                fontStyle: 'italic',
                color: "#006400",
                fontSize: 15,
                fontWeight: 'bold'
            }}>Acessar</Text>}
            onDone= {()=> alert('Entro')}
            ></AppIntroSlider>
        );
    }

  };
  