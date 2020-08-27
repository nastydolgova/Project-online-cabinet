import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import BatteryChargingFullOutlinedIcon from '@material-ui/icons/BatteryChargingFullOutlined';

const UserInfo = { name: "ФИО",
 img: "IMG" 
};



export const UserInfoItem = (
<div>
    <ListItem button>
      <ListItemIcon>
        {UserInfo.img}
      </ListItemIcon>
      {UserInfo.name}
    </ListItem>
    </div>
);

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AccountBoxOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Личный кабинет" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InvertColorsOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Вода" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalGasStationOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Газ" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BatteryChargingFullOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Электричество" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ImportContactsOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Контакты" />
    </ListItem>
  </div>
);