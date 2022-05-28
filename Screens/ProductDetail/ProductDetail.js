import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import Button from '../../Components/Button';
import ProFlatlist from '../../Components/ProFlatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import {useNetInfo} from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import AdBanner from '../../Components/AdBanner';

const Books = [
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 1 is the best book',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 2',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 3',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 4',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 5',
  },
];

let data = [];

export default function ProductDetail(props) {
  const [indicator, setindicator] = useState(false);
  const [Book, setBook] = useState(null);
  const [related, setrelated] = useState([]);
  const [tag, settag] = useState([]);
  const [path, setpath] = useState(null);
  const [user, setUser] = useState('');
  const [checked, setChecked] = React.useState('MWALLET');
  const [isModalVisible, setModalVisible] = useState(false);
  const {config, fs} = RNFetchBlob;
  const netInfo = useNetInfo();

  useEffect(() => {
    BookDetails();
    AddBookView();
  }, []);
  const BookDetails = async id => {
    /// This function is written to get Book Details from Api
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');
    let userdata = await AsyncStorage.getItem('userdata');
    const AuthStr = 'Bearer '.concat(token);
    setUser(JSON.parse(userdata));
    var formdata = new FormData();

    formdata.append('book_id', id != undefined ? id : props.route.params.ids);
    // console.log('FormData===>>', formdata);
    axios
      .post(`${url}/book-detail`, formdata, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log('book response', response);
        if (response.data.status == 200) {
          setBook(response.data.successData.book);
          settag(response.data.successData.book.tags);
          setrelated(response.data.successData.related_books);
          setindicator(false);
          // console.log("console of path",response.data.successData.book.path);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
        setindicator(false);
        Toast.show(error.response.data.message, Toast.SHORT);
        // console.log(JSON.parse(JSON.stringify(error)))
        console.log(error.response);
        console.log(error.message);
      });
  };
  /// This function is written to add Book in Recently Viewed.

  const AddBookView = async () => {
    /// This function is written to add Book in Recently Viewed.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');
    const AuthStr = 'Bearer '.concat(token);
    console.log('this is auth str', token);
    if (token != null) {
      var formdata = new FormData();
      formdata.append('book_id', props.route.params.ids);
      axios
        .post(`${url}/add-book-view`, formdata, {
          headers: {Authorization: AuthStr},
        })
        .then(async response => {
          console.log(response);
          if (response.data.status == 200) {
            setindicator(false);
          }
        })
        .catch(error => {
          // handle error
          console.log(error);
          setindicator(false);
          Toast.show(error.response.data.message, Toast.SHORT);
          // console.log(JSON.parse(JSON.stringify(error)))
          console.log(error.response);
          console.log(error.message);
        });
    }
  };
  // for addinf book into a offinemodes
  const ReadOffline = async (link, Book) => {
    console.log(
      'check the book data while sending book and user both dtails',
      Book,
      user,
    );
    if (user.email == 'azeemdigitalsolutions@gmail.com') {
      setindicator(true);
      // console.log("check the offline URL", link)
      console.log('check the offline Book Data', Book);
      let date = new Date();

      Toast.show('Wait, Book move to Offline');
      let PictureDir = fs.dirs.DocumentDir; // this is the pictures directory. You can check the available directories in the wiki.

      let options = {
        fileCache: true,
        appendExt: 'pdf',
        path: PictureDir + '/path-to-file.anything',
        useDownloadManager: true,
        addAndroidDownloads: {
          useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
          notification: false,
          appendExt: 'png',
          path: 'Users/ranglerzoffice1/Desktop/MyApps', // this is the path where your downloaded file will live in
          description: 'Downloading image.',
        },
      };
      RNFetchBlob.config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        // appendExt: 'pdf',
        fileCache: true,
      })
        .fetch('GET', link, {})
        .progress((received, total) => {
          console.log('received ', received);
          console.log('TOTAL ', total); //  <=========== Receiving -1 always
          console.log('progress', received / total);
        })
        .then(async res => {
          // the temp file path
          setindicator(false);
          Toast.show('Successfully Stored !');
          let Book_Data = {};
          console.log('The file saved to ', res.path());

          Book_Data.path = res.path() + '.pdf';
          Book_Data.id = Book.id;
          Book_Data.image = Book.featured_image;
          Book_Data.title = Book.title;
          data.push(Book_Data);
          console.log('check data before setting', data);
          let allBooks = JSON.parse(await AsyncStorage.getItem('offlineData'));
          console.log('check allBOOKS ', allBooks);

          if (allBooks != null && allBooks.length > 0) {
            console.log('yeh chala', data);
            if (allBooks.findIndex(val => val.id == Book_Data.id) == -1) {
              allBooks.push(Book_Data);
              await AsyncStorage.setItem(
                'offlineData',
                JSON.stringify(allBooks),
              );
            }
          } else {
            console.log('yeh chalaaaaaaaaa', data);
            await AsyncStorage.setItem('offlineData', JSON.stringify(data));
          }
          navigation.navigate('ReadOffline', {link: res.path()});
        })
        .catch(err => {
          // the temp file path
          setindicator(false);
          console.log('The file error to ', JSON.parse(JSON.stringify(err)));
        });
    } else if (Book.price == null) {
      Toast.show('No Price added for this book');
    } else {
      setModalVisible(true);
    }
  };
  const DownloadBook = async (link, Book) => {
    setindicator(true);
    // console.log("check the offline URL", link)
    console.log('check the offline Book Data', Book);
    let date = new Date();

    Toast.show('Wait, Book move to Offline');
    let PictureDir = fs.dirs.DocumentDir; // this is the pictures directory. You can check the available directories in the wiki.

    let options = {
      fileCache: true,
      appendExt: 'pdf',
      path: PictureDir + '/path-to-file.anything',
      useDownloadManager: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: false,
        appendExt: 'png',
        path: 'Users/ranglerzoffice1/Desktop/MyApps', // this is the path where your downloaded file will live in
        description: 'Downloading image.',
      },
    };
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      appendExt: 'pdf',
      fileCache: true,
    })
      .fetch('GET', link, {})
      .then(async res => {
        // the temp file path
        setindicator(false);
        Toast.show('Successfully Stored !');
        let Book_Data = {};
        console.log('The file saved to ', res.path());

        Book_Data.path = res.path();
        Book_Data.id = Book.id;
        Book_Data.image = Book.featured_image;
        Book_Data.title = Book.title;
        Book_Data.url = Book.file;
        // SaveBooks(Book_Data)
        data.push(Book_Data);
        console.log('check data before setting', data);
        let allBooks = JSON.parse(await AsyncStorage.getItem('offlineData'));
        console.log('check allBOOKS ', allBooks);

        if (allBooks != null && allBooks.length > 0) {
          console.log('yeh chala', data);
          if (allBooks.findIndex(val => val.id == Book_Data.id) == -1) {
            allBooks.push(Book_Data);
            await AsyncStorage.setItem('offlineData', JSON.stringify(allBooks));
          } else if (
            allBooks.map(
              val => val.id == Book_Data.id && val.url != Book_Data.url,
            )
          ) {
            console.log('this one chala', val);
            allBooks.pop(val);
            console.log(
              'check allBOOKS after removing updated books',
              allBooks,
            );
            allBooks.push(Book_Data);
            await AsyncStorage.setItem('offlineData', JSON.stringify(allBooks));
          }
        } else {
          console.log('yeh chalaaaaaaaaa', data);
          await AsyncStorage.setItem('offlineData', JSON.stringify(data));
        }
        console.log('Console log check the', user);
        props.navigation.navigate('ReadOffline', {link: res.path()});
      })
      .catch(err => {
        // the temp file path
        setindicator(false);
        console.log('The file error to ', JSON.parse(JSON.stringify(err)));
      });
  };
  const SaveBooks = async newbook => {
    let allBooks = JSON.parse(await AsyncStorage.getItem('offlineData'));
    console.log('all books array from async', allBooks);
    console.log('yeh new book ai ha download hony k bad', newbook);
  };
  return (
    <View style={styles.container}>
      <AdBanner />

      {/* {console.log('HHHHH', Book)} */}
      <View style={{marginTop: hp(2)}}>
        <Modal
          isVisible={isModalVisible}
          animationIn={'flipInX'}
          animationInTiming={1000}
          animationOut={'flipOutX'}
          animationOutTiming={1000}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          style={{alignSelf: 'center'}}>
          <View style={styles.modalview}>
            <Text
              style={[
                styles.note,
                {
                  marginTop: hp(2),
                  fontSize: 16,
                  paddingHorizontal: 10,
                  fontFamily: 'Poppins-Regular',
                },
              ]}>
              By paying Rs {Book != null ? Book.price : '60'} you will be able
              to read books offline without internet for next 365 days
            </Text>
            <View style={styles.radioview}>
              <Text style={[styles.radiotext, {paddingRight: 20}]}>
                Mobile Account(JazzCash)
              </Text>
              <RadioButton
                value="MWALLET"
                status={checked === 'MWALLET' ? 'checked' : 'unchecked'}
                color={colors.blue}
                onPress={() => setChecked('MWALLET')}
              />
            </View>
            <View style={styles.radioview}>
              <Text style={styles.radiotext}>Credit/Debit Cards</Text>
              <RadioButton
                value="MIGS"
                color={colors.blue}
                status={checked === 'MIGS' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('MIGS')}
              />
            </View>

            <Button
              Title="OK"
              Button={styles.button}
              TextStyle={styles.btntext}
              Indicator={indicator}
              btnPress={() => {
                props.navigation.navigate('PaymentView', {
                  user: user,
                  books: Book,
                  payment: checked,
                });
                setModalVisible(false);
              }}
            />
            <Text
              style={[
                styles.note,
                {fontFamily: 'Poppins-Bold', paddingHorizontal: 10},
              ]}>
              Note: Dear User, Your internet connection should be stable and do
              not close the app while downloading the book or it will cancel the
              download
            </Text>
          </View>
        </Modal>
      </View>

      {indicator ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={30} color={colors.blue} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: 120,
              backgroundColor: 'transparent',
              borderWidth: 0.1,
              shadowColor: '#000',
              shadowOffset: {width: 40, height: 40},
              shadowOpacity: 1,
              shadowRadius: 20,
              elevation: 20,
              alignSelf: 'center',
            }}>
            {Book != null ? (
              <Image
                source={{uri: Book.featured_image}}
                resizeMode={'cover'}
                style={styles.bookimg}
              />
            ) : (
              <Image
                source={require('../../Assets/book.jpg')}
                resizeMode={'contain'}
                style={styles.bookimg}
              />
            )}
          </View>
          <Text style={styles.booktitle}>
            {Book != null ? Book.title : <Text>Title of Book</Text>}
          </Text>
          <Text style={styles.authertext}>
            {Book != null ? Book.author : <Text>Author of Book</Text>}
          </Text>
          <View style={styles.btnview}>
            {Book &&
              Book.purchased === false &&
              Book.download === false &&
              Book.price != 0 && (
                <>
                  <Button
                    Title="Read now"
                    Button={styles.button1}
                    TextStyle={styles.btntext1}
                    Indicator={indicator}
                    btnPress={() => {
                      props.navigation.navigate('ReadNow', {
                        link: Book.file,
                        ids: Book.id,
                      });
                    }}
                  />
                  <Button
                    Title="Read Offline"
                    Button={styles.button2}
                    TextStyle={styles.btntext2}
                    Indicator={indicator}
                    btnPress={() => {
                      if (user != null) {
                        if (Book.price == 0) {
                          DownloadBook(Book.file, Book);
                        } else {
                          ReadOffline(Book.file, Book);
                        }
                      } else {
                        Toast.show('Please Login First');
                      }
                    }}
                  />
                </>
              )}
            {Book &&
              Book.purchased === false &&
              Book.download === false &&
              Book.price == 0 && (
                <>
                  <Button
                    Title="Read now"
                    Button={styles.button1}
                    TextStyle={styles.btntext1}
                    Indicator={indicator}
                    btnPress={() => {
                      props.navigation.navigate('ReadNow', {
                        link: Book.file,
                        ids: Book.id,
                      });
                    }}
                  />
                  <Button
                    Title="Download Free"
                    Button={[styles.button2, {width: wp(35)}]}
                    TextStyle={styles.btntext2}
                    Indicator={indicator}
                    btnPress={() => {
                      if (user != null) {
                        if (Book.price == 0) {
                          DownloadBook(Book.file, Book);
                        } else {
                          ReadOffline(Book.file, Book);
                        }
                      } else {
                        Toast.show('Please Login First');
                      }
                    }}
                  />
                </>
              )}

            {Book &&
              Book.purchased === true &&
              Book.download === false &&
              Book.price != 0 && (
                // <Button
                //     Title="Read now"
                //     Button={styles.button1}
                //     TextStyle={styles.btntext1}
                //     Indicator={indicator}
                //     btnPress={() => { props.navigation.navigate('ReadNow', { link: Book.file, ids: Book.id }) }}
                // />
                <>
                  <Button
                    Title="Read now"
                    Button={styles.button1}
                    TextStyle={styles.btntext1}
                    Indicator={indicator}
                    btnPress={() => {
                      props.navigation.navigate('ReadNow', {
                        link: Book.file,
                        ids: Book.id,
                      });
                    }}
                  />
                  <Button
                    Title="Download"
                    Button={styles.button2}
                    TextStyle={styles.btntext2}
                    Indicator={indicator}
                    btnPress={() => {
                      DownloadBook(Book.file, Book);
                    }}
                  />
                </>
              )}
            {Book &&
              Book.purchased === true &&
              Book.download === true &&
              Book.price != 0 && (
                <>
                  <Button
                    Title="Read now"
                    Button={styles.button1}
                    TextStyle={styles.btntext1}
                    Indicator={indicator}
                    btnPress={() => {
                      props.navigation.navigate('ReadNow', {
                        link: Book.file,
                        ids: Book.id,
                      });
                    }}
                  />
                  <Button
                    Title="Download"
                    Button={styles.button2}
                    TextStyle={styles.btntext2}
                    Indicator={indicator}
                    btnPress={() => {
                      DownloadBook(Book.file, Book);
                    }}
                  />
                </>
              )}
          </View>
          <View style={{marginHorizontal: wp(4)}}>
            <Text style={styles.text}>Short Details</Text>
            <Text style={styles.shortdetail}>
              {Book != null ? Book.description : <Text>No Book Detail </Text>}
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={tag}
              horizontal={true}
              // numColumns={props.Column}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.tagbtn}>
                  <Text style={styles.tagtext}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Text style={styles.text}>Similar Listings</Text>
          </View>

          <View style={{marginVertical: hp(1)}}>
            <ProFlatlist
              Data={related}
              Horizontal={true}
              Booktouchable={styles.booktouchable}
              Imgbook={styles.imgbook}
              Trendtext={styles.trendtext}
              // btnPress={categoriesHandler}
              btnPress={id => {
                BookDetails(id);
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 14,
    color: colors.blue,
    // marginTop: hp(20),
    fontFamily: 'Poppins-Bold',
  },
  note: {
    color: colors.blue,
    textAlign: 'justify',
  },
  authertext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    // fontWeight: 'bold',
    color: colors.blue,
    alignSelf: 'center',
    // marginTop: hp(1)
    // alignSelf: 'center'
  },
  bookimg: {
    height: hp(26),
    width: wp(30),
    borderRadius: 10,
  },
  booktitle: {
    color: colors.purple,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    alignSelf: 'center',
    width: wp(60),
    marginVertical: hp(2),
  },
  btnview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(70),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(3),
    // backgroundColor:'red'
  },
  button1: {
    justifyContent: 'center',
    width: wp(20),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(0.6),
  },
  btntext1: {
    fontSize: 14,
    color: colors.purple,
    marginVertical: hp(1),
    fontFamily: 'Poppins-SemiBold',
  },
  button2: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    width: wp(30),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(1),
    shadowColor: colors.blue,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  btntext2: {
    fontSize: 14,
    color: colors.white,
    marginVertical: hp(1),
    fontFamily: 'Poppins-SemiBold',
  },
  shortdetail: {
    color: colors.purple,
    fontSize: 12,
    lineHeight: hp(2.5),
    textAlign: 'justify',
    marginVertical: hp(2),
    // width: wp(90),
    width: '90%',
    fontFamily: 'Poppins-Regular',
  },
  tagbtn: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    width: wp(20),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(1),
    marginHorizontal: hp(0.5),
    shadowColor: colors.blue,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  tagtext: {
    fontSize: 10,
    // paddingVertical: 6
    // alignSelf:'center',
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: hp(1),
  },
  booktouchable: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.purple,
    height: hp(32),
    marginVertical: hp(2),
    marginHorizontal: wp(1),
  },
  imgbook: {
    height: hp(26),
    width: wp(30),
    borderRadius: 10,
  },
  trendtext: {
    color: colors.purple,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    width: wp(25),
    marginVertical: hp(1),
    // backgroundColor:'red'
  },
  modalview: {
    height: 375,
    width: wp(85),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    width: wp(30),
    height: hp(6),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(2),
    // marginBottom: hp(15),
    shadowColor: colors.blue,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  btntext: {
    fontSize: 14,
    color: colors.white,
    marginVertical: hp(1),
    fontFamily: 'Poppins-SemiBold',
  },
  BoxContainer: {
    width: wp(70),
    height: hp(8),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightbackground,
    borderColor: colors.gray,
    marginTop: hp(3),
  },
  radioview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(70),
    marginVertical: 5,
  },
  radiotext: {
    alignSelf: 'center',
    fontSize: 16,
    color: colors.blue,
    fontFamily: 'Poppins-Bold',
    width: wp(70),
  },
});
