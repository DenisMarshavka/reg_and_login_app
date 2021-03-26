import React from "react";
import {Text, View, ActivityIndicator, ScrollView} from 'react-native';
import PropType from "prop-types";
import {useDispatch, useSelector} from "react-redux";

import styles from './styles'
import withSystemTheme from "../../../../utils/HoC/withSystemTheme";
import {COLORS} from "../../../constants";
import {getUsersListAction} from "../../../../store/app/app.actions";


const UsersList = ({
    isDarkTheme,
    colorText,
}) => {
    const dispatch = useDispatch();

    const {
        users = [],
        loading = true,
        error = null,
    } = useSelector(({ app = {} }) => ({
        users: app.users,
        loading: app.usersLoading,
        error: app.usersError,
    }));

    React.useEffect(() => {
        dispatch(getUsersListAction());
    }, [dispatch]);

    return (
        <>
            {
                loading && !error ? (
                    <View style={styles.centerWrap}>
                        <ActivityIndicator size="large" color={COLORS[colorText]} />
                    </View>
                ) : !error ? (
                    <View style={styles.container}>
                        <View style={[styles.listHead, {borderColor: COLORS[!isDarkTheme ? 'dark' : 'light']}]}>
                            <View style={[styles.listRowBox, {borderRightColor: COLORS[!isDarkTheme ? 'dark' : 'light']}]}>
                                <Text style={[styles.listHeadTitle, {color: COLORS[!isDarkTheme ? 'dark' : 'light']}]}>
                                    №
                                </Text>
                            </View>

                            <View style={[styles.listRowBox, {width: '75%', borderRightWidth: 0}]}>
                                <Text style={styles.listHeadTitle}>
                                    User Name
                                </Text>
                            </View>
                        </View>

                        <ScrollView>
                        {
                            users.map((item = {}, key = 0) => (
                                <View
                                    key={`user-item-${key}`}
                                    style={
                                        [
                                            styles.listRow,
                                            {borderColor: COLORS[!isDarkTheme ? 'dark' : 'light']},
                                            key === users.length - 1 && {
                                                borderBottomWidth: 2,
                                            },
                                        ]
                                    }
                                >
                                    <View style={[styles.listRowBox, {borderRightColor: COLORS[!isDarkTheme ? 'dark' : 'light']}]}>
                                        <Text style={[styles.itemRowText, {color: COLORS[!isDarkTheme ? 'dark' : 'light']}]}>
                                            {item.id || '-'}
                                        </Text>
                                    </View>

                                    <View
                                        style={
                                           [
                                               styles.listRowBox,
                                               {
                                                   width: '75%',
                                                   borderRightWidth: 0,
                                                   borderRightColor: COLORS[!isDarkTheme ? 'dark' : 'light']
                                               },
                                           ]
                                        }
                                    >
                                        <Text
                                            style={
                                                [
                                                    styles.itemRowText,
                                                    {color: COLORS[!isDarkTheme ? 'dark' : 'light']},
                                                ]
                                        }>
                                            {
                                                (
                                                    item.username && item.username.trim()
                                                    && item.username
                                                ) || '---'
                                            }
                                        </Text>
                                    </View>
                                </View>
                            ))
                        }
                        </ScrollView>
                    </View>
                ) : (
                    <View style={styles.centerWrap}>
                        <Text style={styles.errorText}>Something went wrong :(</Text>
                    </View>
                )
            }
        </>
    );
};

UsersList.propTypes = {
    isDarkTheme: PropType.bool,
    colorText: PropType.oneOf(['light', 'dark']),
};

UsersList.defaultProps = {
    isDarkTheme: false,
    colorText: 'light',
};

export default React.memo(withSystemTheme(UsersList));
