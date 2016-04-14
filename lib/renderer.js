import React from 'react';
import { render } from 'react-dom';
import Application from './components/application';
import $ from 'jquery';

render(<Application />, document.querySelector('.application'));

$('.welcome-message').fadeTo(250, 1);
$('.welcome-image').fadeTo(250, 1);
$('.welcome-message').delay(400).animate({left: "-=200px", duration: 450});
$('.welcome-image').delay(400).animate({top: "+=100px", duration: 450});
$('.welcome-message').delay(950).fadeTo(150, 0);
$('.welcome-image').delay(950).fadeTo(150, 0);

$('.controls').delay(1450).fadeTo(600, 1);
$('.controls-open-song').delay(1600).fadeTo(600, 1);
$('.controls-deselect').delay(1600).fadeTo(600, 1);
$('.song-list').delay(1950).fadeTo(600, 1);
$('.active-song').delay(2100).fadeTo(600, 1);
