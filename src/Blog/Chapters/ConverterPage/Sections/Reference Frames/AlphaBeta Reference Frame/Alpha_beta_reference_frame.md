### The $\alpha\beta\gamma$ reference frame

The rotating vector created from the three-phase alternating vectors above can also be represented with only two vectors.
We call this the $\alpha\beta\gamma$ reference frame, or sometimes just the $\alpha\beta$ reference frame since $\gamma = 0$ in balanced three-phase systems.

Technically, we can choose where the $\alpha$- and $\beta$ axis should be, but it is convention to choose $\alpha$ to coincide with the a-phase reference (or 0$^\circ$), and have the $\beta$ axis be perpendicular.
This way, the $\alpha$ vector will closely coincide with active power in a rotating machine or converter, and $\beta$ with reactive power.

A signal represented in the abc reference frame can be converted to a $\alpha\beta\gamma$ signal by using the [Clark transformation](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_transformation):

$$
\begin{bmatrix}
i_{\alpha}(t)\\
i_{\beta}(t)\\
i_{\gamma}(t)
\end{bmatrix}={\frac {2}{3}}
\begin{bmatrix}
1 & -\frac{1}{2} & -\frac{1}{2} \\
0 & \frac{\sqrt{3}}{2} & -\frac{\sqrt{3}}{2} \\
\frac{1}{2} & \frac{1}{2} & \frac{1}{2}
\end{bmatrix}
\begin{bmatrix}
i_a(t)\\
i_b(t)\\
i_c(t)
\end{bmatrix}
$$

The $\alpha\beta$ reference frame is often used in conjunction with space-vector modulation (SVM) of three-phase converters.
