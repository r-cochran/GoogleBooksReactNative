import React from 'react';
import { StyleSheet, Button, Text, View, Image } from 'react-native';
import { Book } from '../model/book';

export interface Props {
    book: Book;
    return: Function;
}

interface State {
    book: Book;
}

export class BookComponent extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            book: props.book
        }
    }
    render() {
        let book: Book = this.state.book;
        return (
            <View style={styles.root}>
                <Button title="Return" onPress={() => this.props.return()}/>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: book.thumbnail}}
                    />
                <Text>Title: {book.title}</Text>
                <Text>By: {book.authors}</Text>
                <Text>Publisher: {book.publisher}</Text>
                <Text>Published Date: {book.publishedDate}</Text>
                <Text>Description: {book.description}</Text>
                <Text>Average Rating: {book.averageRating}</Text>
                <Text>Price: {book.price}</Text>
                <Text>Type: {book.printType}</Text>
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