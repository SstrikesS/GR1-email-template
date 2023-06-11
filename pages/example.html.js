const htmlLink = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Welcome to My Shop!</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="/assets/notifications/styles.css">
    <style>
        .button__cell { background: #ff0000; }
        a, a:hover, a:active, a:visited { color: #ff0000; }
    </style>
</head>

<body>
<table class="body">
    <tr>
        <td>
            <table class="header row">
                <tr>
                    <td class="header__cell">
                        <center>
                            <table class="container">
                                <tr>
                                    <td>
                                        <table class="row">
                                            <tr>
                                                <td class="shop-name__cell">
                                                    <img src="https://example.com/logo.png" alt="My Shop" width="200px">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </center>
                    </td>
                </tr>
            </table>

            <table class="row content">
                <tr>
                    <td class="content__cell">
                        <center>
                            <table class="container">
                                <tr>
                                    <td>
                                        <h2>Welcome to My Shop!</h2>
                                        <p>You've activated your customer account. Next time you shop with us, log in for faster checkout.</p>

                                        <table class="row actions">
                                            <tr>
                                                <td class="actions__cell">
                                                    <table class="button main-action-cell">
                                                        <tr>
                                                            <td class="button__cell"><a href="https://example.com" class="button__text">Visit our store</a></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                            </table>
                        </center>
                    </td>
                </tr>
            </table>

            <table class="row footer">
                <tr>
                    <td class="footer__cell">
                        <center>
                            <table class="container">
                                <tr>
                                    <td>
                                        <p class="disclaimer__subtext">If you have any questions, reply to this email or contact us at <a href="mailto:info@example.com">info@example.com</a></p>
                                    </td>
                                </tr>
                            </table>
                        </center>
                    </td>
                </tr>
            </table>

            <img src="notifications/spacer.png" class="spacer" height="1" />
        </td>
    </tr>
</table>
</body>
</html>`
export default htmlLink