import React, {useState} from "react";
import {Pressable, StyleSheet, Text} from "react-native";

import {View} from "./Themed";
import useRecordShakes from "@/sensors/shakerecorder";

export default function Skjelvemaler({path}: { path: string }) {
    const [recording, setRecording] = useState<boolean>(false);
    const {data, isRecording, startRecording} = useRecordShakes();

    const enableRecord = !isRecording;
    const enableSave = !(recording || !data || data.length === 0)

    return (
        <View style={styles.buttonContainer}>
            <Pressable style={enableRecord ? styles.knapp : styles.disabled} disabled={!enableRecord} onPress={() => {
                startRecording();
            }}>
                <Text style={enableRecord ? styles.knappetekst : styles.knappetekst__disabled}>Opptak</Text>
            </Pressable>
            <View style={isRecording ? styles.greendot : styles.reddot}><Text>Antall
                målepunkter: {data.length}</Text></View>
            <Pressable style={enableSave ? styles.knapp : styles.disabled}
                       disabled={!enableSave}
                       onPress={() => console.log("Lagre")}><Text style={enableSave ? styles.knappetekst : styles.knappetekst__disabled}>Testy</Text></Pressable>
            <Pressable style={styles.knapp} onPress={() => console.log("Tester")}><Text
                style={styles.knappetekst}>Tester</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'tan',
        flexDirection: 'column',
        marginHorizontal: 5,
        marginBottom: 100
    },
    paragraph: {
        color: 'black'
    },
    knapp: {
        flex: 1,
        borderRadius: 5,
        shadowColor: 'black',
        shadowRadius: 5,
        margin: 10,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    disabled: {
        flex: 1,
        borderRadius: 5,
        shadowColor: 'black',
        shadowRadius: 5,
        margin: 10,
        borderColor: 'gray',
        backgroundColor: 'white',
        opacity: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    knappetekst: {
        fontFamily: 'System',
        margin: "auto",
        fontSize: 30,
        textAlign: "center"
    },
    knappetekst__disabled: {
        fontFamily: 'System',
        margin: "auto",
        fontSize: 30,
        color: 'gray'
    },
    progressbar: {
        marginHorizontal: 5,
        shadowColor: 'black',
        shadowRadius: 3,
    },
    reddot: {
        height: 20,
        backgroundColor: 'red'
    },
    greendot: {
        height: 20,
        backgroundColor: 'green'
    }
});
