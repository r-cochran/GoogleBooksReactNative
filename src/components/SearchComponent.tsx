import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';
import { Book } from '../model/book';

export interface Props {
    onSearch: Function;
}

interface State {
    term: string;
    books: Book[];
}

export class SearchComponent extends React.Component<Props, State> {
    term: string;
    constructor(props: Props){
        super(props);
        this.state = {
            term: "",
            books: []
        }
    }
    updateTerm(term: string): void {
        this.setState({term: term});
    }
    search(): void {
        this.props.onSearch(this.state.term);
    }
    render() {
        return (
            <View style={styles.root}>
                <Text>Google Books</Text>
                <View style={styles.textInput}>
                    <TextInput 
                        placeholder="Book Name"
                        onChangeText={(text) => this.updateTerm(text)}
                        ></TextInput>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Search" onPress={() => this.search()}/>
                    </View>
                </View>
            </View>
        )
    }
}

// styles
const styles = StyleSheet.create({
    root: {
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
      textAlignVertical: 'top',
      margin: 10
    },
    textInput: {

    },
    buttons: {
      flexDirection: 'row',
      minHeight: 70,
      alignItems: 'stretch',
      alignSelf: 'flex-start',
    },
    button: {
      flex: 1
    }
  });