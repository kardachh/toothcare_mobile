import {CalendarList, LocaleConfig} from 'react-native-calendars/src';
import {View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {setSelectedDate} from "../redux/store";
import dateFns, {addWeeks, format, parse, subWeeks} from "date-fns";
import {GlobalStyles} from "../GlobalStyles";

type CalendarScreenProps = {
    navigation?: any;
};

LocaleConfig.locales.ru = {
    monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    monthNamesShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    dayNames: [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота',
    ],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
};
LocaleConfig.defaultLocale = 'ru';

export const CalendarScreen: FC<CalendarScreenProps> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(state => state.slice.selectedDate);

    useEffect(() => {
        console.log(selectedDate)
    },
    [selectedDate]);

    return (
        <View style={GlobalStyles.page}>
            <CalendarList
                style={{height: "100%"}}
                current={format(new Date(), "yyyy-MM-dd")}
                firstDay={1}

                // disabledByDefault={true}
                pastScrollRange={1}
                futureScrollRange={1}
                // minDate={format(subWeeks(selectedDate, 2), "yyyy-MM-dd")}
                // maxDate={format(addWeeks(selectedDate, 2), "yyyy-MM-dd")}
                theme={{
                    textDayStyle: {color: "black"},
                    todayTextColor: "red",
                    selectedDayTextColor: "black",
                    selectedDayBackgroundColor: "#fff"
                }}
                onDayPress={date => {
                    const d = parse(date.dateString, 'yyyy-MM-dd', new Date())
                    dispatch(setSelectedDate(d));
                    navigation.goBack();
                }}
            />
        </View>
    );
};
