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
            term: "Undertale",
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
                <Text style={styles.header}>Google Books</Text>
                <View>
                    <TextInput 
                        placeholder="Book Name"
                        value={this.state.term}
                        onChangeText={(text) => this.updateTerm(text)}
                        style={styles.textInput}
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
      alignItems: 'baseline',
      alignSelf: 'baseline',
      textAlignVertical: 'top',
      margin: 10
    },
    header: {
        fontSize: 50,
        marginBottom: 10
    },
    textInput: {
        fontSize: 30,
        marginBottom: 10
    },
    buttons: {
      flexDirection: 'row',
      minHeight: 70,
      alignItems: 'stretch',
      alignSelf: 'flex-start',
    },
    button: {
      flex: 1,
    }
  });