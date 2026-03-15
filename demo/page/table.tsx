import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import BlockIcon from '@mui/icons-material/Block';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {
    Avatar,
    Box,
    Chip,
    type ChipProps,
    Divider, IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText, Menu, MenuItem,
    Stack,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import {useQuery} from '@tanstack/react-query';
import React, {Fragment, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {Body, Breadcrumbs, DataTable, PageTitle, PlainTable, Select, Switch} from '../../src';
import {serializePageable, usePagination} from "../../src";
import {mockFetchPageable} from "../utils";

const orders = [
    { 'id': 'INV-1381', 'date': 'Apr 30, 2024', 'status': 'Paid', 'amount': 129.99, 'method': 'Credit Card', 'category': 'Electronics', 'customer': { 'initial': 'A', 'name': 'Amara Osei', 'email': 'amara.osei@email.com' } },
    { 'id': 'INV-1380', 'date': 'Apr 29, 2024', 'status': 'Cancelled', 'amount': 245.50, 'method': 'PayPal', 'category': 'Clothing', 'customer': { 'initial': 'L', 'name': 'Liam Chen', 'email': 'liam.chen@email.com' } },
    { 'id': 'INV-1379', 'date': 'Apr 28, 2024', 'status': 'Paid', 'amount': 89.00, 'method': 'Bank Transfer', 'category': 'Books', 'customer': { 'initial': 'S', 'name': 'Sofia Petrov', 'email': 'sofia.p@email.com' } },
    { 'id': 'INV-1378', 'date': 'Apr 27, 2024', 'status': 'Refunded', 'amount': 312.75, 'method': 'Apple Pay', 'category': 'Home & Garden', 'customer': { 'initial': 'M', 'name': 'Marcus Webb', 'email': 'marcus.w@email.com' } },
    { 'id': 'INV-1377', 'date': 'Apr 26, 2024', 'status': 'Paid', 'amount': 56.25, 'method': 'Google Pay', 'category': 'Food & Drink', 'customer': { 'initial': 'E', 'name': 'Elena Vasquez', 'email': 'elena.v@email.com' } },
    { 'id': 'INV-1376', 'date': 'Apr 25, 2024', 'status': 'Cancelled', 'amount': 478.00, 'method': 'Credit Card', 'category': 'Electronics', 'customer': { 'initial': 'D', 'name': 'Daniel Okoro', 'email': 'dan.okoro@email.com' } },
    { 'id': 'INV-1375', 'date': 'Apr 24, 2024', 'status': 'Paid', 'amount': 167.30, 'method': 'PayPal', 'category': 'Sports', 'customer': { 'initial': 'H', 'name': 'Hannah Fischer', 'email': 'h.fischer@email.com' } },
    { 'id': 'INV-1374', 'date': 'Apr 23, 2024', 'status': 'Refunded', 'amount': 95.60, 'method': 'Bank Transfer', 'category': 'Clothing', 'customer': { 'initial': 'R', 'name': 'Raj Patel', 'email': 'raj.patel@email.com' } },
    { 'id': 'INV-1373', 'date': 'Apr 22, 2024', 'status': 'Paid', 'amount': 203.40, 'method': 'Apple Pay', 'category': 'Home & Garden', 'customer': { 'initial': 'C', 'name': 'Chloe Nguyen', 'email': 'chloe.ng@email.com' } },
    { 'id': 'INV-1372', 'date': 'Apr 21, 2024', 'status': 'Cancelled', 'amount': 420.00, 'method': 'Credit Card', 'category': 'Electronics', 'customer': { 'initial': 'T', 'name': 'Tobias Keller', 'email': 'tobias.k@email.com' } },
    { 'id': 'INV-1371', 'date': 'Apr 20, 2024', 'status': 'Refunded', 'amount': 75.80, 'method': 'Google Pay', 'category': 'Books', 'customer': { 'initial': 'N', 'name': 'Nadia Kowalski', 'email': 'nadia.kw@email.com' } },
    { 'id': 'INV-1370', 'date': 'Apr 19, 2024', 'status': 'Paid', 'amount': 350.25, 'method': 'PayPal', 'category': 'Sports', 'customer': { 'initial': 'J', 'name': 'James Okafor', 'email': 'james.o@email.com' } },
    { 'id': 'INV-1369', 'date': 'Apr 18, 2024', 'status': 'Paid', 'amount': 188.90, 'method': 'Credit Card', 'category': 'Clothing', 'customer': { 'initial': 'W', 'name': 'Wendy Lau', 'email': 'wendy.lau@email.com' } },
    { 'id': 'INV-1368', 'date': 'Apr 17, 2024', 'status': 'Cancelled', 'amount': 62.15, 'method': 'Bank Transfer', 'category': 'Food & Drink', 'customer': { 'initial': 'P', 'name': 'Patrick Byrne', 'email': 'p.byrne@email.com' } },
    { 'id': 'INV-1367', 'date': 'Apr 16, 2024', 'status': 'Refunded', 'amount': 299.99, 'method': 'Apple Pay', 'category': 'Electronics', 'customer': { 'initial': 'Y', 'name': 'Yuki Sato', 'email': 'yuki.s@email.com' } },
    { 'id': 'INV-1366', 'date': 'Apr 15, 2024', 'status': 'Paid', 'amount': 145.00, 'method': 'Google Pay', 'category': 'Home & Garden', 'customer': { 'initial': 'G', 'name': 'Grace Adeyemi', 'email': 'grace.a@email.com' } },
    { 'id': 'INV-1365', 'date': 'Apr 14, 2024', 'status': 'Cancelled', 'amount': 510.50, 'method': 'Credit Card', 'category': 'Electronics', 'customer': { 'initial': 'Z', 'name': 'Zara Khan', 'email': 'zara.k@email.com' } },
    { 'id': 'INV-1364', 'date': 'Apr 13, 2024', 'status': 'Paid', 'amount': 38.75, 'method': 'PayPal', 'category': 'Books', 'customer': { 'initial': 'I', 'name': 'Isla Murray', 'email': 'isla.m@email.com' } },
    { 'id': 'INV-1363', 'date': 'Apr 12, 2024', 'status': 'Refunded', 'amount': 267.80, 'method': 'Bank Transfer', 'category': 'Sports', 'customer': { 'initial': 'F', 'name': 'Felix Andersen', 'email': 'felix.a@email.com' } },
    { 'id': 'INV-1362', 'date': 'Apr 11, 2024', 'status': 'Paid', 'amount': 183.20, 'method': 'Apple Pay', 'category': 'Clothing', 'customer': { 'initial': 'L', 'name': 'Luna Park', 'email': 'luna.park@email.com' } },
    { 'id': 'INV-1361', 'date': 'Apr 10, 2024', 'status': 'Cancelled', 'amount': 129.99, 'method': 'Credit Card', 'category': 'Food & Drink', 'customer': { 'initial': 'O', 'name': 'Oscar Rivera', 'email': 'oscar.r@email.com' } },
    { 'id': 'INV-1360', 'date': 'Apr 9, 2024', 'status': 'Paid', 'amount': 245.50, 'method': 'Google Pay', 'category': 'Electronics', 'customer': { 'initial': 'V', 'name': 'Viktor Holm', 'email': 'viktor.h@email.com' } },
    { 'id': 'INV-1359', 'date': 'Apr 8, 2024', 'status': 'Refunded', 'amount': 89.00, 'method': 'PayPal', 'category': 'Home & Garden', 'customer': { 'initial': 'K', 'name': 'Kwame Asante', 'email': 'kwame.a@email.com' } },
    { 'id': 'INV-1358', 'date': 'Apr 7, 2024', 'status': 'Paid', 'amount': 312.75, 'method': 'Bank Transfer', 'category': 'Books', 'customer': { 'initial': 'M', 'name': 'Mia Tanaka', 'email': 'mia.t@email.com' } },
    { 'id': 'INV-1357', 'date': 'Apr 6, 2024', 'status': 'Cancelled', 'amount': 56.25, 'method': 'Credit Card', 'category': 'Sports', 'customer': { 'initial': 'B', 'name': 'Benjamin Cruz', 'email': 'ben.cruz@email.com' } },
    { 'id': 'INV-1356', 'date': 'Apr 5, 2024', 'status': 'Paid', 'amount': 478.00, 'method': 'Apple Pay', 'category': 'Clothing', 'customer': { 'initial': 'A', 'name': 'Amara Osei', 'email': 'amara.osei@email.com' } },
    { 'id': 'INV-1355', 'date': 'Apr 4, 2024', 'status': 'Refunded', 'amount': 167.30, 'method': 'Google Pay', 'category': 'Food & Drink', 'customer': { 'initial': 'T', 'name': 'Tobias Keller', 'email': 'tobias.k@email.com' } },
    { 'id': 'INV-1354', 'date': 'Apr 3, 2024', 'status': 'Paid', 'amount': 95.60, 'method': 'PayPal', 'category': 'Electronics', 'customer': { 'initial': 'S', 'name': 'Sofia Petrov', 'email': 'sofia.p@email.com' } },
    { 'id': 'INV-1353', 'date': 'Apr 2, 2024', 'status': 'Cancelled', 'amount': 203.40, 'method': 'Credit Card', 'category': 'Home & Garden', 'customer': { 'initial': 'R', 'name': 'Raj Patel', 'email': 'raj.patel@email.com' } },
    { 'id': 'INV-1352', 'date': 'Apr 1, 2024', 'status': 'Paid', 'amount': 420.00, 'method': 'Bank Transfer', 'category': 'Books', 'customer': { 'initial': 'W', 'name': 'Wendy Lau', 'email': 'wendy.lau@email.com' } },
    { 'id': 'INV-1351', 'date': 'Mar 31, 2024', 'status': 'Refunded', 'amount': 75.80, 'method': 'Apple Pay', 'category': 'Sports', 'customer': { 'initial': 'P', 'name': 'Patrick Byrne', 'email': 'p.byrne@email.com' } },
    { 'id': 'INV-1350', 'date': 'Mar 30, 2024', 'status': 'Paid', 'amount': 350.25, 'method': 'Credit Card', 'category': 'Clothing', 'customer': { 'initial': 'G', 'name': 'Grace Adeyemi', 'email': 'grace.a@email.com' } },
    { 'id': 'INV-1349', 'date': 'Mar 29, 2024', 'status': 'Cancelled', 'amount': 188.90, 'method': 'Google Pay', 'category': 'Electronics', 'customer': { 'initial': 'Y', 'name': 'Yuki Sato', 'email': 'yuki.s@email.com' } },
    { 'id': 'INV-1348', 'date': 'Mar 28, 2024', 'status': 'Paid', 'amount': 62.15, 'method': 'PayPal', 'category': 'Food & Drink', 'customer': { 'initial': 'Z', 'name': 'Zara Khan', 'email': 'zara.k@email.com' } },
    { 'id': 'INV-1347', 'date': 'Mar 27, 2024', 'status': 'Refunded', 'amount': 299.99, 'method': 'Bank Transfer', 'category': 'Home & Garden', 'customer': { 'initial': 'L', 'name': 'Liam Chen', 'email': 'liam.chen@email.com' } },
    { 'id': 'INV-1346', 'date': 'Mar 26, 2024', 'status': 'Paid', 'amount': 145.00, 'method': 'Credit Card', 'category': 'Books', 'customer': { 'initial': 'H', 'name': 'Hannah Fischer', 'email': 'h.fischer@email.com' } },
    { 'id': 'INV-1345', 'date': 'Mar 25, 2024', 'status': 'Cancelled', 'amount': 510.50, 'method': 'Apple Pay', 'category': 'Sports', 'customer': { 'initial': 'D', 'name': 'Daniel Okoro', 'email': 'dan.okoro@email.com' } },
    { 'id': 'INV-1344', 'date': 'Mar 24, 2024', 'status': 'Paid', 'amount': 38.75, 'method': 'Google Pay', 'category': 'Clothing', 'customer': { 'initial': 'E', 'name': 'Elena Vasquez', 'email': 'elena.v@email.com' } },
    { 'id': 'INV-1343', 'date': 'Mar 23, 2024', 'status': 'Refunded', 'amount': 267.80, 'method': 'PayPal', 'category': 'Electronics', 'customer': { 'initial': 'M', 'name': 'Marcus Webb', 'email': 'marcus.w@email.com' } },
    { 'id': 'INV-1342', 'date': 'Mar 22, 2024', 'status': 'Cancelled', 'amount': 183.20, 'method': 'Credit Card', 'category': 'Food & Drink', 'customer': { 'initial': 'C', 'name': 'Chloe Nguyen', 'email': 'chloe.ng@email.com' } },
    { 'id': 'INV-1341', 'date': 'Mar 21, 2024', 'status': 'Paid', 'amount': 129.99, 'method': 'Bank Transfer', 'category': 'Home & Garden', 'customer': { 'initial': 'N', 'name': 'Nadia Kowalski', 'email': 'nadia.kw@email.com' } },
    { 'id': 'INV-1340', 'date': 'Mar 20, 2024', 'status': 'Paid', 'amount': 245.50, 'method': 'Apple Pay', 'category': 'Books', 'customer': { 'initial': 'J', 'name': 'James Okafor', 'email': 'james.o@email.com' } },
    { 'id': 'INV-1339', 'date': 'Mar 19, 2024', 'status': 'Refunded', 'amount': 89.00, 'method': 'Credit Card', 'category': 'Sports', 'customer': { 'initial': 'I', 'name': 'Isla Murray', 'email': 'isla.m@email.com' } },
    { 'id': 'INV-1338', 'date': 'Mar 18, 2024', 'status': 'Cancelled', 'amount': 312.75, 'method': 'Google Pay', 'category': 'Clothing', 'customer': { 'initial': 'F', 'name': 'Felix Andersen', 'email': 'felix.a@email.com' } },
    { 'id': 'INV-1337', 'date': 'Mar 17, 2024', 'status': 'Paid', 'amount': 56.25, 'method': 'PayPal', 'category': 'Electronics', 'customer': { 'initial': 'L', 'name': 'Luna Park', 'email': 'luna.park@email.com' } },
    { 'id': 'INV-1336', 'date': 'Mar 16, 2024', 'status': 'Refunded', 'amount': 478.00, 'method': 'Bank Transfer', 'category': 'Food & Drink', 'customer': { 'initial': 'O', 'name': 'Oscar Rivera', 'email': 'oscar.r@email.com' } },
    { 'id': 'INV-1335', 'date': 'Mar 15, 2024', 'status': 'Paid', 'amount': 167.30, 'method': 'Credit Card', 'category': 'Home & Garden', 'customer': { 'initial': 'V', 'name': 'Viktor Holm', 'email': 'viktor.h@email.com' } },
    { 'id': 'INV-1334', 'date': 'Mar 14, 2024', 'status': 'Cancelled', 'amount': 95.60, 'method': 'Apple Pay', 'category': 'Books', 'customer': { 'initial': 'K', 'name': 'Kwame Asante', 'email': 'kwame.a@email.com' } },
    { 'id': 'INV-1333', 'date': 'Mar 13, 2024', 'status': 'Paid', 'amount': 203.40, 'method': 'Google Pay', 'category': 'Sports', 'customer': { 'initial': 'B', 'name': 'Benjamin Cruz', 'email': 'ben.cruz@email.com' } },
    { 'id': 'INV-1332', 'date': 'Mar 12, 2024', 'status': 'Refunded', 'amount': 420.00, 'method': 'PayPal', 'category': 'Clothing', 'customer': { 'initial': 'M', 'name': 'Mia Tanaka', 'email': 'mia.t@email.com' } },
    { 'id': 'INV-1331', 'date': 'Mar 11, 2024', 'status': 'Paid', 'amount': 75.80, 'method': 'Credit Card', 'category': 'Electronics', 'customer': { 'initial': 'W', 'name': 'Wendy Lau', 'email': 'wendy.lau@email.com' } },
    { 'id': 'INV-1330', 'date': 'Mar 10, 2024', 'status': 'Cancelled', 'amount': 350.25, 'method': 'Bank Transfer', 'category': 'Food & Drink', 'customer': { 'initial': 'A', 'name': 'Amara Osei', 'email': 'amara.osei@email.com' } },
    { 'id': 'INV-1329', 'date': 'Mar 9, 2024', 'status': 'Paid', 'amount': 188.90, 'method': 'Apple Pay', 'category': 'Home & Garden', 'customer': { 'initial': 'P', 'name': 'Patrick Byrne', 'email': 'p.byrne@email.com' } },
    { 'id': 'INV-1328', 'date': 'Mar 8, 2024', 'status': 'Refunded', 'amount': 62.15, 'method': 'Google Pay', 'category': 'Books', 'customer': { 'initial': 'G', 'name': 'Grace Adeyemi', 'email': 'grace.a@email.com' } },
    { 'id': 'INV-1327', 'date': 'Mar 7, 2024', 'status': 'Cancelled', 'amount': 299.99, 'method': 'Credit Card', 'category': 'Sports', 'customer': { 'initial': 'Y', 'name': 'Yuki Sato', 'email': 'yuki.s@email.com' } },
    { 'id': 'INV-1326', 'date': 'Mar 6, 2024', 'status': 'Paid', 'amount': 145.00, 'method': 'PayPal', 'category': 'Clothing', 'customer': { 'initial': 'Z', 'name': 'Zara Khan', 'email': 'zara.k@email.com' } },
    { 'id': 'INV-1325', 'date': 'Mar 5, 2024', 'status': 'Paid', 'amount': 510.50, 'method': 'Bank Transfer', 'category': 'Electronics', 'customer': { 'initial': 'T', 'name': 'Tobias Keller', 'email': 'tobias.k@email.com' } },
    { 'id': 'INV-1324', 'date': 'Mar 4, 2024', 'status': 'Refunded', 'amount': 38.75, 'method': 'Apple Pay', 'category': 'Food & Drink', 'customer': { 'initial': 'S', 'name': 'Sofia Petrov', 'email': 'sofia.p@email.com' } },
    { 'id': 'INV-1323', 'date': 'Mar 3, 2024', 'status': 'Cancelled', 'amount': 267.80, 'method': 'Credit Card', 'category': 'Home & Garden', 'customer': { 'initial': 'R', 'name': 'Raj Patel', 'email': 'raj.patel@email.com' } },
    { 'id': 'INV-1322', 'date': 'Mar 2, 2024', 'status': 'Paid', 'amount': 183.20, 'method': 'Google Pay', 'category': 'Books', 'customer': { 'initial': 'H', 'name': 'Hannah Fischer', 'email': 'h.fischer@email.com' } },
    { 'id': 'INV-1321', 'date': 'Mar 1, 2024', 'status': 'Refunded', 'amount': 129.99, 'method': 'PayPal', 'category': 'Sports', 'customer': { 'initial': 'D', 'name': 'Daniel Okoro', 'email': 'dan.okoro@email.com' } },
    { 'id': 'INV-1320', 'date': 'Feb 29, 2024', 'status': 'Paid', 'amount': 245.50, 'method': 'Credit Card', 'category': 'Clothing', 'customer': { 'initial': 'L', 'name': 'Liam Chen', 'email': 'liam.chen@email.com' } },
    { 'id': 'INV-1319', 'date': 'Feb 28, 2024', 'status': 'Cancelled', 'amount': 89.00, 'method': 'Bank Transfer', 'category': 'Electronics', 'customer': { 'initial': 'E', 'name': 'Elena Vasquez', 'email': 'elena.v@email.com' } },
    { 'id': 'INV-1318', 'date': 'Feb 27, 2024', 'status': 'Paid', 'amount': 312.75, 'method': 'Apple Pay', 'category': 'Food & Drink', 'customer': { 'initial': 'C', 'name': 'Chloe Nguyen', 'email': 'chloe.ng@email.com' } },
    { 'id': 'INV-1317', 'date': 'Feb 26, 2024', 'status': 'Refunded', 'amount': 56.25, 'method': 'Google Pay', 'category': 'Home & Garden', 'customer': { 'initial': 'N', 'name': 'Nadia Kowalski', 'email': 'nadia.kw@email.com' } },
    { 'id': 'INV-1316', 'date': 'Feb 25, 2024', 'status': 'Paid', 'amount': 478.00, 'method': 'Credit Card', 'category': 'Books', 'customer': { 'initial': 'M', 'name': 'Marcus Webb', 'email': 'marcus.w@email.com' } },
    { 'id': 'INV-1315', 'date': 'Feb 24, 2024', 'status': 'Cancelled', 'amount': 167.30, 'method': 'PayPal', 'category': 'Sports', 'customer': { 'initial': 'J', 'name': 'James Okafor', 'email': 'james.o@email.com' } },
    { 'id': 'INV-1314', 'date': 'Feb 23, 2024', 'status': 'Paid', 'amount': 95.60, 'method': 'Bank Transfer', 'category': 'Clothing', 'customer': { 'initial': 'I', 'name': 'Isla Murray', 'email': 'isla.m@email.com' } },
    { 'id': 'INV-1313', 'date': 'Feb 22, 2024', 'status': 'Refunded', 'amount': 203.40, 'method': 'Apple Pay', 'category': 'Electronics', 'customer': { 'initial': 'W', 'name': 'Wendy Lau', 'email': 'wendy.lau@email.com' } },
    { 'id': 'INV-1312', 'date': 'Feb 21, 2024', 'status': 'Paid', 'amount': 420.00, 'method': 'Credit Card', 'category': 'Food & Drink', 'customer': { 'initial': 'F', 'name': 'Felix Andersen', 'email': 'felix.a@email.com' } },
    { 'id': 'INV-1311', 'date': 'Feb 20, 2024', 'status': 'Cancelled', 'amount': 75.80, 'method': 'Google Pay', 'category': 'Home & Garden', 'customer': { 'initial': 'L', 'name': 'Luna Park', 'email': 'luna.park@email.com' } },
    { 'id': 'INV-1310', 'date': 'Feb 19, 2024', 'status': 'Paid', 'amount': 350.25, 'method': 'PayPal', 'category': 'Books', 'customer': { 'initial': 'O', 'name': 'Oscar Rivera', 'email': 'oscar.r@email.com' } },
    { 'id': 'INV-1309', 'date': 'Feb 18, 2024', 'status': 'Refunded', 'amount': 188.90, 'method': 'Bank Transfer', 'category': 'Sports', 'customer': { 'initial': 'V', 'name': 'Viktor Holm', 'email': 'viktor.h@email.com' } },
    { 'id': 'INV-1308', 'date': 'Feb 17, 2024', 'status': 'Cancelled', 'amount': 62.15, 'method': 'Credit Card', 'category': 'Clothing', 'customer': { 'initial': 'P', 'name': 'Patrick Byrne', 'email': 'p.byrne@email.com' } },
    { 'id': 'INV-1307', 'date': 'Feb 16, 2024', 'status': 'Paid', 'amount': 299.99, 'method': 'Apple Pay', 'category': 'Electronics', 'customer': { 'initial': 'K', 'name': 'Kwame Asante', 'email': 'kwame.a@email.com' } },
    { 'id': 'INV-1306', 'date': 'Feb 15, 2024', 'status': 'Paid', 'amount': 145.00, 'method': 'Google Pay', 'category': 'Food & Drink', 'customer': { 'initial': 'G', 'name': 'Grace Adeyemi', 'email': 'grace.a@email.com' } },
    { 'id': 'INV-1305', 'date': 'Feb 14, 2024', 'status': 'Refunded', 'amount': 510.50, 'method': 'PayPal', 'category': 'Home & Garden', 'customer': { 'initial': 'B', 'name': 'Benjamin Cruz', 'email': 'ben.cruz@email.com' } },
    { 'id': 'INV-1304', 'date': 'Feb 13, 2024', 'status': 'Cancelled', 'amount': 38.75, 'method': 'Credit Card', 'category': 'Books', 'customer': { 'initial': 'Y', 'name': 'Yuki Sato', 'email': 'yuki.s@email.com' } },
    { 'id': 'INV-1303', 'date': 'Feb 12, 2024', 'status': 'Paid', 'amount': 267.80, 'method': 'Bank Transfer', 'category': 'Sports', 'customer': { 'initial': 'Z', 'name': 'Zara Khan', 'email': 'zara.k@email.com' } },
    { 'id': 'INV-1302', 'date': 'Feb 11, 2024', 'status': 'Refunded', 'amount': 183.20, 'method': 'Apple Pay', 'category': 'Clothing', 'customer': { 'initial': 'M', 'name': 'Mia Tanaka', 'email': 'mia.t@email.com' } },
    { 'id': 'INV-1301', 'date': 'Feb 10, 2024', 'status': 'Paid', 'amount': 129.99, 'method': 'Credit Card', 'category': 'Electronics', 'customer': { 'initial': 'A', 'name': 'Amara Osei', 'email': 'amara.osei@email.com' } },
    { 'id': 'INV-1300', 'date': 'Feb 9, 2024', 'status': 'Cancelled', 'amount': 245.50, 'method': 'Google Pay', 'category': 'Food & Drink', 'customer': { 'initial': 'T', 'name': 'Tobias Keller', 'email': 'tobias.k@email.com' } },
    { 'id': 'INV-1299', 'date': 'Feb 8, 2024', 'status': 'Paid', 'amount': 89.00, 'method': 'PayPal', 'category': 'Home & Garden', 'customer': { 'initial': 'S', 'name': 'Sofia Petrov', 'email': 'sofia.p@email.com' } },
    { 'id': 'INV-1298', 'date': 'Feb 7, 2024', 'status': 'Refunded', 'amount': 312.75, 'method': 'Bank Transfer', 'category': 'Books', 'customer': { 'initial': 'R', 'name': 'Raj Patel', 'email': 'raj.patel@email.com' } },
    { 'id': 'INV-1297', 'date': 'Feb 6, 2024', 'status': 'Paid', 'amount': 56.25, 'method': 'Credit Card', 'category': 'Sports', 'customer': { 'initial': 'H', 'name': 'Hannah Fischer', 'email': 'h.fischer@email.com' } },
    { 'id': 'INV-1296', 'date': 'Feb 5, 2024', 'status': 'Cancelled', 'amount': 478.00, 'method': 'Apple Pay', 'category': 'Clothing', 'customer': { 'initial': 'D', 'name': 'Daniel Okoro', 'email': 'dan.okoro@email.com' } },
    { 'id': 'INV-1295', 'date': 'Feb 4, 2024', 'status': 'Paid', 'amount': 167.30, 'method': 'Google Pay', 'category': 'Electronics', 'customer': { 'initial': 'L', 'name': 'Liam Chen', 'email': 'liam.chen@email.com' } },
    { 'id': 'INV-1294', 'date': 'Feb 3, 2024', 'status': 'Refunded', 'amount': 95.60, 'method': 'PayPal', 'category': 'Food & Drink', 'customer': { 'initial': 'E', 'name': 'Elena Vasquez', 'email': 'elena.v@email.com' } },
    { 'id': 'INV-1293', 'date': 'Feb 2, 2024', 'status': 'Paid', 'amount': 203.40, 'method': 'Credit Card', 'category': 'Home & Garden', 'customer': { 'initial': 'C', 'name': 'Chloe Nguyen', 'email': 'chloe.ng@email.com' } },
    { 'id': 'INV-1292', 'date': 'Feb 1, 2024', 'status': 'Cancelled', 'amount': 420.00, 'method': 'Bank Transfer', 'category': 'Books', 'customer': { 'initial': 'N', 'name': 'Nadia Kowalski', 'email': 'nadia.kw@email.com' } },
    { 'id': 'INV-1291', 'date': 'Jan 31, 2024', 'status': 'Paid', 'amount': 75.80, 'method': 'Apple Pay', 'category': 'Sports', 'customer': { 'initial': 'W', 'name': 'Wendy Lau', 'email': 'wendy.lau@email.com' } },
    { 'id': 'INV-1290', 'date': 'Jan 30, 2024', 'status': 'Refunded', 'amount': 350.25, 'method': 'Credit Card', 'category': 'Clothing', 'customer': { 'initial': 'J', 'name': 'James Okafor', 'email': 'james.o@email.com' } },
    { 'id': 'INV-1289', 'date': 'Jan 29, 2024', 'status': 'Paid', 'amount': 188.90, 'method': 'Google Pay', 'category': 'Electronics', 'customer': { 'initial': 'M', 'name': 'Marcus Webb', 'email': 'marcus.w@email.com' } },
    { 'id': 'INV-1288', 'date': 'Jan 28, 2024', 'status': 'Cancelled', 'amount': 62.15, 'method': 'PayPal', 'category': 'Food & Drink', 'customer': { 'initial': 'I', 'name': 'Isla Murray', 'email': 'isla.m@email.com' } },
    { 'id': 'INV-1287', 'date': 'Jan 27, 2024', 'status': 'Paid', 'amount': 299.99, 'method': 'Bank Transfer', 'category': 'Home & Garden', 'customer': { 'initial': 'P', 'name': 'Patrick Byrne', 'email': 'p.byrne@email.com' } },
    { 'id': 'INV-1286', 'date': 'Jan 26, 2024', 'status': 'Refunded', 'amount': 145.00, 'method': 'Credit Card', 'category': 'Books', 'customer': { 'initial': 'F', 'name': 'Felix Andersen', 'email': 'felix.a@email.com' } },
    { 'id': 'INV-1285', 'date': 'Jan 25, 2024', 'status': 'Paid', 'amount': 510.50, 'method': 'Apple Pay', 'category': 'Sports', 'customer': { 'initial': 'G', 'name': 'Grace Adeyemi', 'email': 'grace.a@email.com' } },
    { 'id': 'INV-1284', 'date': 'Jan 24, 2024', 'status': 'Cancelled', 'amount': 38.75, 'method': 'Google Pay', 'category': 'Clothing', 'customer': { 'initial': 'L', 'name': 'Luna Park', 'email': 'luna.park@email.com' } },
    { 'id': 'INV-1283', 'date': 'Jan 23, 2024', 'status': 'Refunded', 'amount': 267.80, 'method': 'PayPal', 'category': 'Electronics', 'customer': { 'initial': 'O', 'name': 'Oscar Rivera', 'email': 'oscar.r@email.com' } },
    { 'id': 'INV-1282', 'date': 'Jan 22, 2024', 'status': 'Paid', 'amount': 183.20, 'method': 'Credit Card', 'category': 'Food & Drink', 'customer': { 'initial': 'V', 'name': 'Viktor Holm', 'email': 'viktor.h@email.com' } },
    { 'id': 'INV-1281', 'date': 'Jan 21, 2024', 'status': 'Cancelled', 'amount': 129.99, 'method': 'Bank Transfer', 'category': 'Home & Garden', 'customer': { 'initial': 'Y', 'name': 'Yuki Sato', 'email': 'yuki.s@email.com' } },
    { 'id': 'INV-1280', 'date': 'Jan 20, 2024', 'status': 'Paid', 'amount': 245.50, 'method': 'Apple Pay', 'category': 'Books', 'customer': { 'initial': 'K', 'name': 'Kwame Asante', 'email': 'kwame.a@email.com' } },
    { 'id': 'INV-1279', 'date': 'Jan 19, 2024', 'status': 'Refunded', 'amount': 89.00, 'method': 'Credit Card', 'category': 'Sports', 'customer': { 'initial': 'Z', 'name': 'Zara Khan', 'email': 'zara.k@email.com' } },
    { 'id': 'INV-1278', 'date': 'Jan 18, 2024', 'status': 'Paid', 'amount': 312.75, 'method': 'Google Pay', 'category': 'Clothing', 'customer': { 'initial': 'B', 'name': 'Benjamin Cruz', 'email': 'ben.cruz@email.com' } },
    { 'id': 'INV-1277', 'date': 'Jan 17, 2024', 'status': 'Cancelled', 'amount': 56.25, 'method': 'PayPal', 'category': 'Electronics', 'customer': { 'initial': 'M', 'name': 'Mia Tanaka', 'email': 'mia.t@email.com' } },
    { 'id': 'INV-1276', 'date': 'Jan 16, 2024', 'status': 'Paid', 'amount': 478.00, 'method': 'Bank Transfer', 'category': 'Food & Drink', 'customer': { 'initial': 'A', 'name': 'Amara Osei', 'email': 'amara.osei@email.com' } },
    { 'id': 'INV-1275', 'date': 'Jan 15, 2024', 'status': 'Refunded', 'amount': 167.30, 'method': 'Credit Card', 'category': 'Home & Garden', 'customer': { 'initial': 'S', 'name': 'Sofia Petrov', 'email': 'sofia.p@email.com' } },
    { 'id': 'INV-1274', 'date': 'Jan 14, 2024', 'status': 'Paid', 'amount': 95.60, 'method': 'Apple Pay', 'category': 'Books', 'customer': { 'initial': 'T', 'name': 'Tobias Keller', 'email': 'tobias.k@email.com' } },
    { 'id': 'INV-1273', 'date': 'Jan 13, 2024', 'status': 'Cancelled', 'amount': 203.40, 'method': 'Google Pay', 'category': 'Sports', 'customer': { 'initial': 'R', 'name': 'Raj Patel', 'email': 'raj.patel@email.com' } },
    { 'id': 'INV-1272', 'date': 'Jan 12, 2024', 'status': 'Paid', 'amount': 420.00, 'method': 'PayPal', 'category': 'Clothing', 'customer': { 'initial': 'H', 'name': 'Hannah Fischer', 'email': 'h.fischer@email.com' } },
    { 'id': 'INV-1271', 'date': 'Jan 11, 2024', 'status': 'Refunded', 'amount': 75.80, 'method': 'Credit Card', 'category': 'Electronics', 'customer': { 'initial': 'D', 'name': 'Daniel Okoro', 'email': 'dan.okoro@email.com' } },
    { 'id': 'INV-1270', 'date': 'Jan 10, 2024', 'status': 'Paid', 'amount': 350.25, 'method': 'Bank Transfer', 'category': 'Food & Drink', 'customer': { 'initial': 'W', 'name': 'Wendy Lau', 'email': 'wendy.lau@email.com' } },
    { 'id': 'INV-1269', 'date': 'Jan 9, 2024', 'status': 'Cancelled', 'amount': 188.90, 'method': 'Apple Pay', 'category': 'Home & Garden', 'customer': { 'initial': 'C', 'name': 'Chloe Nguyen', 'email': 'chloe.ng@email.com' } },
    { 'id': 'INV-1268', 'date': 'Jan 8, 2024', 'status': 'Paid', 'amount': 62.15, 'method': 'Credit Card', 'category': 'Books', 'customer': { 'initial': 'E', 'name': 'Elena Vasquez', 'email': 'elena.v@email.com' } },
    { 'id': 'INV-1267', 'date': 'Jan 7, 2024', 'status': 'Refunded', 'amount': 299.99, 'method': 'Google Pay', 'category': 'Sports', 'customer': { 'initial': 'N', 'name': 'Nadia Kowalski', 'email': 'nadia.kw@email.com' } },
    { 'id': 'INV-1266', 'date': 'Jan 6, 2024', 'status': 'Paid', 'amount': 145.00, 'method': 'PayPal', 'category': 'Clothing', 'customer': { 'initial': 'J', 'name': 'James Okafor', 'email': 'james.o@email.com' } },
    { 'id': 'INV-1265', 'date': 'Jan 5, 2024', 'status': 'Cancelled', 'amount': 510.50, 'method': 'Bank Transfer', 'category': 'Electronics', 'customer': { 'initial': 'P', 'name': 'Patrick Byrne', 'email': 'p.byrne@email.com' } },
    { 'id': 'INV-1264', 'date': 'Jan 4, 2024', 'status': 'Paid', 'amount': 38.75, 'method': 'Credit Card', 'category': 'Food & Drink', 'customer': { 'initial': 'G', 'name': 'Grace Adeyemi', 'email': 'grace.a@email.com' } },
    { 'id': 'INV-1263', 'date': 'Jan 3, 2024', 'status': 'Refunded', 'amount': 267.80, 'method': 'Apple Pay', 'category': 'Home & Garden', 'customer': { 'initial': 'I', 'name': 'Isla Murray', 'email': 'isla.m@email.com' } },
    { 'id': 'INV-1262', 'date': 'Jan 2, 2024', 'status': 'Paid', 'amount': 183.20, 'method': 'Google Pay', 'category': 'Books', 'customer': { 'initial': 'L', 'name': 'Luna Park', 'email': 'luna.park@email.com' } },
];

export default function TablePage() {
    const navigate = useNavigate();

    const {
        pageable,
        ...restPagination
    } = usePagination<typeof orders[0]>({ paginationKey: 'orders' });

    const {data: result, isFetching: loading, error} = useQuery({
        queryKey: ['orders', ...serializePageable(pageable)],
        queryFn: () => mockFetchPageable(orders, pageable),
        enabled: pageable !== undefined,
        staleTime: 60 * 1000
    });

    const [showDataTable, setShowDataTable] = useState(true);

    const statusFilter = (pageable?.filter?.['status'] as string) ?? '';
    function handleStatusChange(value: string) {
        const filter = { ...(pageable?.filter ?? {}) };
        if (value) {
            filter['status'] = value;
        } else {
            delete filter['status'];
        }
        restPagination.onFilter(filter);
    }

    return (
        <Body
            title={(
                <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    width="100%"
                >
                    <Box flexGrow={1}>
                        <PageTitle title="Table" />
                    </Box>
                    <Switch
                        label="Data Table"
                        SwitchProps={{
                            checked: showDataTable,
                            onChange: setShowDataTable,
                            color: "success"
                        }}
                        FormControlProps={{ fullWidth: false }}
                    />
                </Stack>
            )}
            top={
                <Breadcrumbs
                    onHomeClick={() => navigate('/')}
                    items={[
                        { label: 'Display' },
                    ]}
                />
            }
        >
            {showDataTable && (
                <DataTable
                    stickyLastColumn
                    page={result}
                    loading={loading}
                    error={error}
                    headers={[
                        { label: 'Invoice', width: 120, sortKey: 'id' },
                        { label: 'Date', width: 140 },
                        { label: 'Status', width: 140 },
                        { label: 'Amount', width: 120 },
                        { label: 'Method', width: 160 },
                        { label: 'Category', width: 140 },
                        { label: 'Customer', width: 240 },
                        { label: '', width: 60 },
                    ]}
                    renderTableRow={item => <TableRowComponent item={item} />}
                    renderListRow={item => <ListRowComponent item={item} />}
                    pageable={pageable}
                    searchKey="needle"
                    filterInputs={
                        <>
                            <Select
                                FormControlProps={{
                                    fullWidth: false
                                }}
                                label="Status"
                                options={[
                                    { label: 'Paid', value: 'Paid' },
                                    { label: 'Refunded', value: 'Refunded' },
                                    { label: 'Cancelled', value: 'Cancelled' },
                                ]}
                                SelectProps={{
                                    value: statusFilter,
                                    onChange: handleStatusChange
                                }}
                            />
                        </>
                    }
                    {...restPagination}
                />
            )}
            {!showDataTable && (
                <PlainTable
                    items={result?.content}
                    loading={loading}
                    error={error}
                    headers={
                        [
                            { label: 'Invoice', width: 120 },
                            { label: 'Date', width: 140 },
                            { label: 'Status', width: 140 },
                            { label: 'Amount', width: 120 },
                            { label: 'Method', width: 160 },
                            { label: 'Category', width: 140 },
                            { label: 'Customer', width: 240 },
                            { label: '', width: 60 },
                        ]
                    }
                    renderTableRow={item => <TableRowComponent item={item} />}
                    renderListRow={item => <ListRowComponent item={item} />}
                />
            )}
        </Body>
    );
}

function TableRowComponent({item}: {item: typeof orders[0]}) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    return (
        <TableRow key={item.id}>
            <TableCell>
                <code>{item.id}</code>

            </TableCell>
            <TableCell>
                <Typography variant="body2">{item.date}</Typography>
            </TableCell>
            <TableCell>
                <Chip
                    size="small"
                    icon={
                        {
                            Paid: <CheckRoundedIcon/>,
                            Refunded: <AutorenewRoundedIcon/>,
                            Cancelled: <BlockIcon/>,
                        }[item.status]
                    }
                    color={
                        {
                            Paid: 'success',
                            Refunded: 'warning',
                            Cancelled: 'error',
                        }[item.status] as ChipProps['color']
                    }
                    label={item.status}
                />
            </TableCell>
            <TableCell>
                <Typography variant="body2">${item.amount.toFixed(2)}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{item.method}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{item.category}</Typography>
            </TableCell>
            <TableCell>
                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {item.customer.initial}
                    </Avatar>
                    <div>
                        <Typography variant="body2">{item.customer.name}</Typography>
                        <Typography variant="body2">{item.customer.email}</Typography>
                    </div>
                </Box>
            </TableCell>
            <TableCell
                onClick={event_ => {
                    event_.stopPropagation();
                }}
            >
                <IconButton
                    size="small"
                    onClick={(event) => { setAnchorEl(event.currentTarget); }}
                >
                    <MoreHorizRoundedIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => { setAnchorEl(null); }}
                    slotProps={{ paper: { sx: { minWidth: 140 } } }}
                >
                    <MenuItem
                        onClick={(event) => {
                            event.stopPropagation();
                            setAnchorEl(null);
                        }}
                    >
                        <ListItemIcon><VisibilityRoundedIcon /></ListItemIcon>
                        <ListItemText>View</ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={(event) => {
                            event.stopPropagation();
                            setAnchorEl(null);
                        }}
                    >
                        <ListItemIcon><EditRoundedIcon /></ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onClick={(event) => {
                            event.stopPropagation();
                            setAnchorEl(null);
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <ListItemIcon><DeleteRoundedIcon color="error" /></ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    )
}

function ListRowComponent({item}: {item: typeof orders[0]}) {
    return (
        <Fragment key={item.id}>
            <ListItem
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                }}
            >
                <ListItemAvatar sx={{ pt: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {item.customer.initial}
                    </Avatar>
                </ListItemAvatar>

                <ListItemText>
                    <Typography fontWeight={600} gutterBottom>
                        {item.customer.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {item.customer.email}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 0.5,
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2">{item.date}</Typography>
                        <Typography variant="body2">&bull;</Typography>
                        <Typography variant="body2">{item.id}</Typography>
                        <Typography variant="body2">&bull;</Typography>
                        <Typography variant="body2">${item.amount.toFixed(2)}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2">{item.method}</Typography>
                        <Typography variant="body2">&bull;</Typography>
                        <Typography variant="body2">{item.category}</Typography>
                    </Box>

                    <Chip
                        size="small"
                        icon={
                            {
                                Paid: <CheckRoundedIcon/>,
                                Refunded: <AutorenewRoundedIcon/>,
                                Cancelled: <BlockIcon/>,
                            }[item.status]
                        }
                        color={
                            {
                                Paid: 'success',
                                Refunded: 'warning',
                                Cancelled: 'error',
                            }[item.status] as ChipProps['color']
                        }
                        label={item.status}
                    />
                </ListItemText>
            </ListItem>
            <Divider />
        </Fragment>
    )
}