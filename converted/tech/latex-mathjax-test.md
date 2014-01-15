Title: LaTeX & MathJax Demo
Date: 2012-12-15 08:45
Author: chriskrycho
Category: Posts
Tags: documentation, Doxygen, Javascript, LaTeX, MathJax, WordPress plugins
Slug: latex-mathjax-test

I recently discovered [MathJax][], a JavaScript library that implements
LaTeX equation display. It's brilliant; we're now using it in our
documentation (it's bundled with [Doxygen][]) and I plan to make heavy
use of it in the future wherever it makes sense. Some samples of its
capabilities:

Einstein's famous equation:

[latex]e = mc\^2[/latex]

Something a little more complicated (one of the equations implemented in
the code I've been working on for the last few months):

[latex]  
C(x,y,z) = 2BhC(x)C\_1(y,b,\\beta)C\_2(z,Z\_c,\\sigma)  
[/latex]

And now, something more complicated yet (defining the elements in the
equation above):

[latex]  
\\begin{align}  
C(x,y,z) &= 2BhC(x)C\_1(y,b,\\beta)C\_2(z,Z\_c,\\sigma) \\\\  
\\\\  
C\_1(y,b,\\beta) &= \\frac{1}{4b}  
\\left[  
\\mbox{erf}\\left(\\  
\\frac{y + b}{\\sqrt{2}\\cdot\\beta}  
\\right) -  
\\mbox{erf}\\left(\\  
\\frac{y - b}{\\sqrt{2}\\cdot\\beta}  
\\right)  
\\right] \\\\  
\\\\  
C\_2(z,Z\_c,\\sigma) &= \\left(\\frac{1}{2\\pi}\\right)\^2  
\\frac{1}{\\sigma}  
\\left[  
\\exp{\\left(  
-\\frac{(z - Z\_c)\^2}{2\\sigma\^2}  
\\right)} +  
\\exp{\\left(  
-\\frac{(z - Z\_c)\^2}{2\\sigma\^2}  
\\right)}  
\\right] \\\\  
\\\\  
B\^2 &= b\^2 + 3\\beta\^2 \\\\  
\\sigma\^2 &= \\begin{cases}  
\\frac{h\^2}{12}, & \\mbox{if } Z\_c \> \\frac{h}{2} \\\\  
\\frac{(h - Z\_c)\^2}{3}, & \\mbox{if } Z\_c \\le \\frac{h}{2}  
\\end{cases}  
\\end{align}  
[/latex]

I highly recommend MathJax. I'm currently running it via the
[MathJax-LaTeX WordPress plugin][], which allows you to embed it with
handy `[​latex]...[​/latex]` shortcode syntax.

  [MathJax]: http://www.mathjax.org/
  [Doxygen]: http://www.stack.nl/~dimitri/doxygen/
  [MathJax-LaTeX WordPress plugin]: http://wordpress.org/extend/plugins/mathjax-latex/
    "MathJax-LaTeX"
