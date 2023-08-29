<?php

/**
 * @copyright  (C) 2023 Dimitrios Grammatikogiannis
 * @license    GNU General Public License version 3 or later
 */

\defined('_JEXEC') || die;

extract($displayData);

// @todo Add the css/js
$this->sublayout('assets', $displayData);
