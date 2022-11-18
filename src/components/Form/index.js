import React, { useState } from 'react';
import { 
        View, 
        Text, 
        TextInput, 
        TouchableOpacity,
        Vibration,
        Keyboard,
        Pressable,
        FlatList 
    } from 'react-native';
import ResultIMC from './ResultIMC';
import styles from './style';

export default function Form() {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [imc, setIMC] = useState(null);
    const [textBtn, setTextBtn] = useState('Calcular');
    const [messageIMC, setMessageIMC] = useState('');
    const [errorMSG, setErrorMSG] = useState(null);
    const [imcList, setIMCList] = useState([]);

    function verifyIMC() {
        Vibration.vibrate();
        imc === null ? setErrorMSG('Campo obrigatório') : undefined;
    };

    function imcCalculator() {
        const heightFormat = height.replace(',', '.');
        const weightFormat = weight.replace(',', '.');
        const totalIMC = (weightFormat/(heightFormat * heightFormat)).toFixed(2);

        setIMCList((previousIMC) => [...previousIMC, {id: new Date().getTime(), imc: totalIMC}]);
        setIMC(totalIMC)
    };

    function validationIMC() {
        if (weight != 0 && height != 0) {
            imcCalculator()
            setWeight(0);
            setHeight(0);
            setMessageIMC('Seu imc é igual a: ');
            setTextBtn('Calcular novamente');
            setErrorMSG(null);
        } else {
            verifyIMC();
            setIMC(null);
            setTextBtn('Calcular');
            setMessageIMC('Preencha o peso e a altura');
        }
    };

    return (
        <View style={styles.formContext}>
            {
                imc === null ? 
                    <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                        <Text style={styles.formLabel}>Altura</Text> 
                        <Text style={styles.errorMSG}>{ errorMSG }</Text> 
                        <TextInput
                        placeholder='Ex.: 1.75'
                        keyboardType='numeric'
                        value={height}
                        onChangeText={setHeight}
                        style={styles.input}/>

                        <Text style={styles.formLabel}>Peso</Text> 
                        <Text style={styles.errorMSG}>{ errorMSG }</Text> 
                        <TextInput
                        placeholder='Ex.: 65'
                        keyboardType='numeric'
                        value={weight}
                        onChangeText={setWeight}
                        style={styles.input}/>

                        <TouchableOpacity 
                        style={styles.btnCalc}
                        onPress={() => validationIMC()}>
                            <Text style={styles.textBtnCalc}>{textBtn}</Text>
                        </TouchableOpacity>
                    </Pressable>
                : 
                    <View>
                        <ResultIMC imc={imc} messageIMC={messageIMC}/>

                        <TouchableOpacity 
                        style={styles.btnCalc}
                        onPress={() => validationIMC()}>
                            <Text style={styles.textBtnCalc}>{textBtn}</Text>
                        </TouchableOpacity>
                    </View>
            }
            <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            data={imcList.reverse()}
            renderItem={({item}) => {
                return (
                    <View>
                        <Text style={styles.flatlistResult}>Resultado anterior do IMC = {item.imc}</Text>
                    </View>
                )
            }}
            keyExtractor={(item) => item.id}
            />
        </View>
    );
};