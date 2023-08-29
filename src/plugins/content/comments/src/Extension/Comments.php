<?php

/**
 * @copyright  (C) 2023 Dimitrios Grammatikogiannis
 * @license    GNU General Public License version 3 or later
 */

namespace Dgrammatiko\Plugin\Content\Comments\Extension;

\defined('_JEXEC') || die;

use Joomla\CMS\Plugin\CMSPlugin;

/**
 * Comments Plugin
 */
final class Comments extends CMSPlugin
{
    /**
     * Plugin that adds comment to an article
     *
     * @param   string   $context  The context of the content being passed to the plugin.
     * @param   mixed    $row      An object with a "text" property
     * @param   mixed    $params   Additional parameters. See {@see PlgContentContent()}.
     * @param   integer  $page     Optional page number. Unused. Defaults to zero.
     *
     * @return  void
     */
    public function onContentPrepare($context, $row, $params, $page = 0)
    {
        if (!in_array($context, ['com_content.category', 'com_content.article', 'com_content.featured'])) {
            return;
        }

        $app = $this->getApplication();
        /**
         * src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname/url/title/og:title/issue-number/specific-term"
        theme="preferred-color-scheme"
         */

    }
}
