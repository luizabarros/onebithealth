import React from 'react';
import { Text, View, TouchableOpacity, Share } from 'react-native';
import styles from './style';

export default function ResultIMC({ imc, messageIMC }) {
    const onShare = async () => {
        const result = await Share.share({
            message: `Esse é o meu IMC ${imc} :)`
        })
    }

    return (
        <View>
            <Text style={styles.imcMessage}>{ messageIMC }</Text>
            <Text style={styles.imcResult}>{ imc }</Text>
            <View>
                <TouchableOpacity onPress={() => onShare()}>
                    <Text style={styles.shareIMC}>Compartilhar IMC</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};