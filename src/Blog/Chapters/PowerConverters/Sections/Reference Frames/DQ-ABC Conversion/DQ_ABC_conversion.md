### Using the dq frame to generate a compensated 3-phase abc signal

One very useful real-world application of the dq reference frame is to decide the values of the currents $i_d(t)$ and $i_q(t)$ such that the rotating emf vector has a specific relationship to a fixed grid voltage.
Look at the figure [below](#converter-figure). This is a simplified circuit diagram of an active converter connected to a grid, where $V_{net}$ is fixed while $V_{converter}$ can be controlled.

If we want to insert **reactive power** into the connection, we can make the converter voltage vector larger in **magnitude** than the grid voltage.
If we want to insert **active power** into the connection, we can make the converter voltage lead the grid voltage by adjusting the **angle**.
Both of these effects can be achieved by manipulating $i_d(t)$ and $i_q(t)$.
In order to realize this "compensated" rotating emf vector, we can:

1.  convert the dq frame signal to a $\alpha\beta$ frame with an inverse Park transformation and use space vector modulation (SVM).
2.  convert the dq frame signal to an abc frame signal with inverse Park- and inverse Clark transformation and use Sinusoidal Pulse Width Modulation (SPWM).
