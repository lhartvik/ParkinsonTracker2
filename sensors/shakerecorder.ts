import {useState} from "react";
import {Accelerometer, AccelerometerMeasurement} from 'expo-sensors';

const useRecordShakes = () => {
    const [data, setData] = useState<AccelerometerMeasurement[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = () => {
        setData([]);
        setIsRecording(true);
        console.log("Starter opptak...")

        Accelerometer.addListener(accelerometerData => {
            setData(currentData => [...currentData, accelerometerData]);
            console.log("Tar opptak")
        });
        Accelerometer.setUpdateInterval(100);

        const timeout = setTimeout(() => {
            Accelerometer.removeAllListeners();
            setIsRecording(false);
            console.log("Stopper opptak...")
        }, 10000)
    }

    return {data, isRecording, startRecording}
}
export default useRecordShakes;