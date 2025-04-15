### The dq0 reference frame

A third way of representing the rotating emf vector is to use the dq0 reference frame. This representation assumes **constant frequency**.
Instead of varying $\alpha$ and $\beta$ axis, we have a fixed d (direct) axis value and a fixed q (qaudrature) axis value.
The rotation of the emf vector is represented with the whole reference frame rotating with frequency $f$.

We can transform a $\alpha\beta$ frame to a dq frame by means of the [Park transformation](https://en.wikipedia.org/wiki/Direct-quadrature-zero_transformation):

$$
\begin{bmatrix}
i_{d}(t)\\
i_{q}(t)\\
i_{0}(t)
\end{bmatrix}=
\begin{bmatrix}
\cos(\theta) & \sin(\theta) & 0 \\
-\sin(\theta) & \cos{\theta} & 0 \\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
i_{\alpha}(t)\\
i_{\beta}(t)\\
i_{\gamma}(t)
\end{bmatrix}
$$

where $\theta$ is the angle of the rotating emf voltage signal at any time.

The dq frame is particularly useful for control purposes, as the d- and q signals are constants.
As such, PI-controllers can more easily control signal to these constant reference values.
