import boxen from 'boxen';
import chalk from 'chalk';
import gradient from 'gradient-string';

const ascii = `
 ~@@@QQQQQ@@B!      ~@@@@@B       .^!?JJ?7~.
.&@@@@@@@@@@@&G!    ~@@@@@B     !5#@@@@@@@@&G7.
.&@@@@@@@@@@@@@@Y   ~@@@@@B   ^G@@@@@@@@@@@@@@#7
.&@@@@@@@@@@@@@@&.  ~@@@@@G  ^&@@@@@@@@@@@@@@@@@7
.&@@@@@@@@@@@@@@Y   ~@@@@@G  5@@@@@@@@@@@@@@@@@@#.
.&@@@@@@@@@@@&P!    ~@@@@@G  P@@@@@@@@@@@@@@@@@@&.
.&@@@@#?&@@@@&!     ~@@@@@G  !@@@@@@@@@@@@@@@@@@Y
.&@@@@B ^G@@@@@Y    ~@@@@@G   7&@@@@@@@@@@@@@@@5
.&@@@@#   J@@@@@B~  !@@@@@B    :Y#@@@@@@@@@@&P~
.?JJJJ?    ~JJJJY?. :JJJJJ7      .~?YPGGP5J!:
`;

export function rioLogo() {
    console.log(
        boxen(chalk.bold(gradient(['#f2e995', '#cfe1a3', '#7f93a8', '#6DB8C2']).multiline(ascii)), {
            margin: 1,
            padding: 2,
        })
    );
}
