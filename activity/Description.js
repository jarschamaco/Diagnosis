import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';

var numeros="0123456789";

export default class Description extends Component {
    
    static navigationOptions =
    {
      title: 'Diagnostico',
      headerTransparent: false,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#0F4C81'
      },
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Icon
            reverse
            name='location-arrow'
            type='font-awesome'
            color='#0F4C81'
            onPress={() => alert("localización")} />
          <Icon
            reverse
            name='address-card'
            type='font-awesome'
            color='#0F4C81'
            onPress={() => alert("información")} />
        </View>  
      ),
    };

    handleBackPress = () => {
      this.props.navigation.goBack();
    } 

    render(){
        var tex = "< Atrás";
        
        const { navigation } = this.props;
        
        var gender =  navigation.getParam('gender', 'default value').toLowerCase();
        var number ='';

        prueba = () =>{
          var fever = navigation.getParam('fever', 'default value').toLowerCase();
          for(i=0; i<fever.length; i++){
            if (numeros.indexOf(fever.charAt(i),0)!=-1){
              number = number+fever.charAt(i);
            }
          }
        }

        function ShowFever(){
          var fever = navigation.getParam('fever', 'default value').toLowerCase();
          var resultadofever='', tratamientofeverOld='', tratamientofeverBoy='';
          var fever_ = 'fiebre';
          var Highfever = 'alta';
          var Highfever1 = 'mucha';
          var Highfever2 = 'demasiada';
          var Lowfever = 'baja';
          var Lowfever1 = 'poca';
          var Lowfever2 = 'muy';
          var nothing = 'no';
          var nothing1 = 'sintoma';
          var nothing2 = 'tengo';
          var yes = 'si';
          var grade = 'grados'

          if  (fever !== "") {
            prueba();            
            if  ((fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(nothing.toLowerCase()) > -1)||
                 (fever.indexOf(nothing.toLowerCase()) > -1 && fever.indexOf(nothing1.toLowerCase()) > -1 )||
                 (fever.indexOf(nothing.toLowerCase()) > -1 && fever.indexOf(nothing2.toLowerCase()) > -1 )){
                  resultadofever = 'El paciente no presenta el sintoma de la fiebre';
                  tratamientofeverOld =  '\n No necesita tratamiento';
                  tratamientofeverBoy =  '\n No necesita tratamiento';
            }else if((fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Lowfever.toLowerCase()) > -1)||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Lowfever1.toLowerCase()) > -1 )||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Lowfever2.toLowerCase()) > -1 && fever.indexOf(Lowfever.toLowerCase()) > -1)||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Lowfever2.toLowerCase()) > -1 && fever.indexOf(Lowfever1.toLowerCase()) > -1)||
            (fever.indexOf(Lowfever.toLowerCase()) > -1)|| (fever.indexOf(Lowfever1.toLowerCase()) > -1 )||
            (fever.indexOf(Lowfever2.toLowerCase()) > -1 && fever.indexOf(Lowfever.toLowerCase()) > -1)||
            (fever.indexOf(Lowfever2.toLowerCase()) > -1 && fever.indexOf(Lowfever1.toLowerCase()) > -1)||
            (fever.indexOf(nothing.toLowerCase()) > -1 && fever.indexOf(Highfever1.toLowerCase()) > -1)||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(nothing2.toLowerCase()) > -1 && fever.indexOf(Lowfever1.toLowerCase()) > -1  )||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(nothing2.toLowerCase()) > -1 && fever.indexOf(Lowfever1.toLowerCase()) > -1 && fever.indexOf(Lowfever2.toLowerCase()) > -1 )){
              resultadofever = 'El paciente presenta el sintoma de la fiebre, pero a un nivel bajo';
              tratamientofeverOld = '\n-Tomar una paracetamol 500 gm cada 4 horas \n -Hidratación abundante con agua';
              tratamientofeverBoy = '\n-Tomar la mitad de una paracetamol cada 4 horas \n -Hidratación abundante con agua' ;
            }else if ((fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Highfever.toLowerCase()) > -1 )||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Highfever1.toLowerCase()) > -1 )||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Highfever.toLowerCase()) > -1 && fever.indexOf(Lowfever2.toLowerCase()) > -1)||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Highfever2.toLowerCase()) > -1)||
            (fever.indexOf(Highfever.toLowerCase()) > -1 )||(fever.indexOf(Highfever1.toLowerCase()) > -1 )||
            (fever.indexOf(Highfever.toLowerCase()) > -1 && fever.indexOf(Lowfever2.toLowerCase()) > -1)||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(Highfever2.toLowerCase()) > -1)||
            (fever.indexOf(Highfever2.toLowerCase()) > -1 )){
              resultadofever = 'El paciente presenta el sintoma de la fiebre, pero a un nivel alto';
              tratamientofeverOld = '\n-Tomar una paracetamol 500 gm cada 8 horas. \n -Hidratación abundante con agua. \n -No abrigar en exceso ni caldear la habitación. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n -Tomar una ducha con agua tibia de 15 o 30 minutos';
              tratamientofeverBoy = '\n-Tomar la mitad de una paracetamol cada 8 horas \n -Hidratación abundante con agua. \n -No abrigar en exceso ni caldear la habitación. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n -Darles baños con agua templada durante 15-20 minutos, dejando que el agua se vaya enfriando poco a poco a la vez que el pequeño.'; 
            }else if((number && fever.indexOf(fever_.toLowerCase()) > -1 )|| (number)){
              resultadofever = 'El paciente presenta el sintoma de la fiebre con '+number+'°C';
              if  (parseInt(number) > 39){
                tratamientofeverOld = '\n-LLevar de urgencia al hospital o subcentro más cercano. \n-Tomar una paracetamol 500 gm cada 8 horas. \n -Hidratación abundante con agua. \n -No abrigar en exceso ni caldear la habitación. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n Tomar una ducha con agua tibia de 15 o 30 minutos';
                tratamientofeverBoy = '\n-LLevar de urgencia al hospital o subcentro más cercano. \n-Tomar la mitad de una paracetamol cada 8 horas \n -Hidratación abundante con agua. \n -No abrigar en exceso ni caldear la habitación. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n Darles baños con agua templada durante 15-20 minutos, dejando que el agua se vaya enfriando poco a poco a la vez que el pequeño.'; 
              }else{
                tratamientofeverOld = '\n-Tomar una paracetamol 500 gm cada 8 horas. \n -Hidratación abundante con agua. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n Tomar una ducha con agua tibia de 15 o 30 minutos';
                tratamientofeverBoy = '\n-Tomar la mitad de una paracetamol cada 8 horas \n -Hidratación abundante con agua. \n -Aplicar paños húmedos templados o frescos, nunca fríos, en la frente. \n Darles baños con agua templada durante 15-20 minutos, dejando que el agua se vaya enfriando poco a poco a la vez que el pequeño.'; 
              }
            }else if ( (fever.indexOf(yes.toLowerCase()) > -1 && fever.indexOf(nothing2.toLowerCase()) > -1 ) ||
            (fever.indexOf(fever_.toLowerCase()) > -1 && fever.indexOf(nothing2.toLowerCase()) > -1 ) ){
              resultadofever = 'El paciente presenta el sintoma de la fiebre';
              tratamientofeverOld = '\n-Tomar una paracetamol 500 gm cada 8 horas. \n -Hidratación abundante con agua. ';
              tratamientofeverBoy = '\n-Tomar la mitad de una paracetamol cada 8 horas \n -Hidratación abundante con agua. '; 
            }else {
              resultadofever = 'No se puede hacer un diagnostico exacto. ';
              tratamientofeverOld = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
              tratamientofeverBoy = '\n Detalle mejor el sintoma para poder mejorar el diagnostico. ';
            }
            
            if  (resultadofever !== ""){
              if  (gender === "boy"){
                return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadofever} {"\n"} Tratamiento: {tratamientofeverBoy}</Text>);
              }else{
                return (<Text> Genero: {gender} {"\n"} Diagnostico: {resultadofever} {"\n"} Tratamiento: {tratamientofeverOld}</Text>);
              }
            }else{return null}
          }
        }

        function Showheadache(){
          var headache = navigation.getParam('headache', 'default value');
          if  (headache !== "") {
            return (<Text> valor: {headache}</Text>);
          }else{return null}
        }

        function Showstomachache(){
          var stomachache = navigation.getParam('stomachache', 'default value');
          if  (stomachache !== "") {
            return (<Text> valor: {stomachache}</Text>);
          }else{return null}
        }

        function Showcold(){
          var cold = navigation.getParam('cold', 'default value');
          if  (cold !== "") {
            return (<Text> valor: {cold}</Text>);
          }else{return null}
        }
        


        return(
            <View style={styles.Container_screen_1}>

                <View style={[styles.Container_principal,{justifyContent: 'center'}]}>
                    <Text style={styles.title_center}>Diagnostico su sintoma</Text>
                    < ShowFever />
                    < Showheadache/>
                    < Showstomachache />
                    < Showcold />
                </View>

                <View style={styles.Container_next_prev}>
                    <View style={styles.fixToText}>
                    <TouchableOpacity
                        style={styles.button_prev}
                        onPress={this.handleBackPress} 
                    >
                        <Text style={{color:"#0F4C81"}}> {tex} </Text>
                    </TouchableOpacity>
                    </View>
                </View> 
            </View>
        )
    }
}

const styles = StyleSheet.create({

    Container_screen_1: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    title_center:{
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
    },
    Container_principal:{
        width: '90%',
        height: '80%',
        position: 'absolute', 
        top: '5%',
        marginLeft: '5%',
        backgroundColor: '#fff'
    },  
    Container_next_prev:{
      width: '100%',
      height: '10%',
      position: 'absolute', 
      left: 0, right: 0, bottom: 0,
      padding: 14,
      marginBottom: 10,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
     button_next: {
      alignItems: 'center',
      backgroundColor: '#0F4C81',
      width: "50%",
      padding: 10
    },
    button_prev: {
      backgroundColor: '#fff',
      width: "50%",
      padding: 10
    },  
    button_gender:{
      backgroundColor: '#0F4C81',
      height: '16%',
      justifyContent: 'center',
      paddingLeft: 30,
      marginBottom:10,
    },
    text_button_gender:{
      fontSize:25,
      textAlignVertical:"center",
      paddingLeft: '10%',
      color: 'white',
      fontWeight: 'bold'
    },
    textAreaContainer: {
        borderColor: '#393d42',
        borderWidth: 1,
        padding: 5
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start"
      }
  });