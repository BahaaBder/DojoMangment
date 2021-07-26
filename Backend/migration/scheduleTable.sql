use dojo;

CREATE TABLE schedule(
    id INT NOT NULL  AUTO_INCREMENT PRIMARY KEY,
    calenderId INT,
    title VARCHAR(40),
    category VARCHAR(40),
    duDateClass VARCHAR(40),
    start VARCHAR(40),
    end VARCHAR(40)

);

////
use dojo; 
drop TABLE schedule;



-- ==============================MMA =================================
use dojo;
INSERT INTO schedule VALUES (null,1,"MMA Mixed Martil art ","time","",'2021-07-25T19:30:00+01:00','2021-07-25T19:30:00+01:00')
INSERT INTO schedule VALUES (null,1,"MMA Mixed Martil art ","time","",'2021-07-27T19:30:00+01:00','2021-07-27T21:30:00+01:00')
INSERT INTO schedule VALUES (null,1,"MMA Mixed Martil art ","time","",'2021-07-29T19:30:00+01:00','2021-07-29T21:30:00+01:00')



-- ==============================Boxing =================================
use dojo;

INSERT INTO schedule VALUES (null,2,"Classic boxing","time","",'2021-07-26T16:30:00+01:00','2021-07-26T20:30:00+01:00')
INSERT INTO schedule VALUES (null,2,"Classic boxing","time","","2021-07-25T19:30:00+01:00",'2021-07-25T19:30:00+01:00')
INSERT INTO schedule VALUES (null,1,"Classic boxing","time","",'2021-07-25T19:30:00+01:00','2021-07-25T19:30:00+01:00')

    -- {
    --     id: '5',
    --     calendarId: '2',
    --     title: boxing,
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-28T16:30:00+01:00',
    --     end: '2021-07-28T20:30:00+01:00',
    -- },
    -- /// bjj
    -- {
    --     id: '6',
    --     calendarId: '3',
    --     title: bjj,
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-30T16:30:00+01:00',
    --     end: '2021-07-30T20:30:00+01:00',
    --     ///// this determine  the color of event background 
    --     bgColor:'#BF0E13'
    -- },
    -- ///
    -- {
    --     id: '7',
    --     calendarId: '4',
    --     title: " takewondo ",
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-25T09:30:00+01:00',
    --     end: '2021-07-25T11:30:00+01:00'
    -- },

    -- {
    --     id: '8',
    --     calendarId: '4',
    --     title: " taekwondo  ",
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-26T09:30:00+01:00',
    --     end: '2021-07-26T11:30:00+01:00'
    -- },
    -- {
    --     id: '9',
    --     calendarId: '4',
    --     title: " taekwondo  ",
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-28T09:30:00+01:00',
    --     end: '2021-07-28T12:30:00+01:00'
    -- },

-- ==============================Brazlian=================================






​