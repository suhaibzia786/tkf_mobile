import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import WebView from "react-native-webview";
import Constants from 'expo-constants';

export default function App() {
    return (
        <>
            <StatusBar style="auto"/>
            <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
                <WebView
                    style={styles.container}
                    source={{uri: 'https://monitoring-backend.tameerekhalaq.org/login'}}
                />
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
