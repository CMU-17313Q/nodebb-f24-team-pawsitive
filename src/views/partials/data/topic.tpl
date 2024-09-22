<div class="post-content"
     data-index="{posts.index}"
     data-pid="{posts.pid}"
     data-uid="{posts.uid}"
     data-timestamp="{posts.timestamp}"
     data-username="{posts.user.username}"
     data-userslug="{posts.user.userslug}"
     {{{ if posts.allowDupe }}} data-allow-dupe="1"{{{ end }}}
     {{{ if posts.navigatorIgnore }}} data-navigator-ignore="1"{{{ end }}}
     itemprop="comment"
     itemtype="http://schema.org/Comment"
     itemscope>

    <!-- Post content like text, images, etc. -->
    <div class="post-body">
        {{{ posts.content }}}
    </div>

    <!-- Add Reaction Buttons for 👍, ❤️, and 😂 -->
    <!-- Commit 1: Adding the reaction buttons with placeholder counts -->
    <div class="post-reactions">
        <span class="reaction" data-reaction="👍" data-pid="{posts.pid}">
            👍 (<span id="count-👍-{posts.pid}">{{ posts.reactions.👍 }}</span>)
        </span>
        <span class="reaction" data-reaction="❤️" data-pid="{posts.pid}">
            ❤️ (<span id="count-❤️-{posts.pid}">{{ posts.reactions.❤️ }}</span>)
        </span>
        <span class="reaction" data-reaction="😂" data-pid="{posts.pid}">
            😂 (<span id="count-😂-{posts.pid}">{{ posts.reactions.😂 }}</span>)
        </span>
    </div>

</div>
