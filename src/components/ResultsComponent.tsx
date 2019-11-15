import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Book } from '../model/book';

export interface Props {
    term: string;
    books: Book[];
    return: Function;
    goToBook: Function;
}

interface State {
    term: string;
    books: Book[];
}

export class ResultsComponent extends React.Component<Props, State> {
    constructor(props: Props, state: State){
        super(props);
        this.state = {
            term: props.term,
            books: props.books
        };
        if(!this.state.books.length){
            this.getResults();
        }
    }
    extractBook(json: any): Book {
        let book = new Book();
        book.id = json.id;
        book.title = json.volumeInfo.title;
        book.authors = json.volumeInfo.authors;
        book.publisher = json.volumeInfo.publisher;
        book.publishedDate = json.volumeInfo.publishedDate;
        book.description = json.volumeInfo.description;
        book.averageRating = json.volumeInfo.averageRating;
        book.thumbnail = (json.volumeInfo.imageLinks) ? json.volumeInfo.imageLinks.smallThumbnail : '';
        book.price = (json.volumeInfo.saleInfo) ? json.volumeInfo.saleInfo.retailPrice.amount : '';
        book.previewLink = json.volumeInfo.previewLink;
        return book;
    }
    getResults() {
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.props.term, {
        method: "GET"
        })
        .then((r) => r.json())
        .then(books => {
            let extractedBooks: Book[] = []
            for(let json of books.items) {
                extractedBooks.push(this.extractBook(json));
            }
            this.setState({term: this.state.term, books: extractedBooks})
         });
    }
    render() {
        let listItems = this.state.books.map((book) => {
            return  <View key={book.id} style={styles.row}>
                        <Text onPress={() => this.props.goToBook(book, this.state.books)}
                            style={styles.title}
                            >
                            {book.title}
                        </Text>
                        <View style={styles.author}>
                            <Text onPress={() => this.props.goToBook(book, this.state.books)}> by {book.authors}</Text>
                        </View>
                    </View>
        })
            
        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Button title="Return" onPress={() => this.props.return()}/>
                    <Text style={styles.term}>Term: {this.state.term}</Text>
                </View>
                <View style={styles.rowWrapper}>
                    {listItems}
                </View>
            </View>
        )
    }
}

// styles
const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      alignSelf: 'center',
    },
    header: {
    },
    term:{
        fontSize: 20
    },
    rowWrapper: {
        maxHeight: 600,
        margin: 10
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingBottom: 3,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20
    },
    author: {
        fontSize: 12,
        marginLeft: 10,
    }

});