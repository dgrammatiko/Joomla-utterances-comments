<?php

/**
 * @copyright  (C) 2023 Dimitrios Grammatikogiannis
 * @license    GNU General Public License version 3 or later
 */

use Joomla\CMS\Factory;

\defined('_JEXEC') || die;

extract($displayData);

$doc = Factory::getDocument();

// @todo Add the css/js
$data = [
  'repo'      => '[ENTER REPO HERE]',
  'issueTerm' => '[ENTER TERM HERE]',
  'theme'     => 'gruvbox-dark',
];

$doc->addScriptOptions('utteranc', $data);

$doc->getWebAssetManager()->getRegistry(JPATH_ROOT . '/media/plg_content_comments/joomla.assets.json');
$doc->getWebAssetManager()->usePreset('utteranc.es');
