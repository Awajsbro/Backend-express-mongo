/*
 HTTP Responses
 ref.: https://www.restapitutorial.com/httpstatuscodes.html
       https://www.ietf.org/assignments/http-status-codes/http-status-codes.xml
 */

// When debugging we want to see the details of the errors in the response.
// In production we want to hide those details.
let internalError
if (process.env.NODE_ENV === 'production')
  internalError = (res, error) => res.status(500).json({ success: false, error: 'Internal Server Error' })
else
  internalError = (res, error) => res.status(500).json({ success: false, error: error })


function Unauthorized(res, challenge){
  // https://tools.ietf.org/html/rfc7235#section-4.1
  // https://tools.ietf.org/html/rfc7617
  // https://tools.ietf.org/html/rfc6750
  res.status(401).set('WWW-Authenticate', challenge).end()
}

module.exports = {
  /*
    204 The server successfully processed the request, but is not returning any content.
     */
  NoContent: res => res.status(204).end(),

  /*
    400 The request could not be understood by the server due to malformed syntax.
     */
  BadRequest: res => res.status(400).json({ success: false, error: 'Bad Request' }),

    /*
    401 The request requires user authentication.
        The response MUST include a WWW-Authenticate header field (section 14.47) containing a challenge applicable to the requested resource.
     */
  Unauthorized,
  Challenges: {
    basic: 'Basic realm="Auth"',
    bearer: 'Bearer realm="Auth"'
  },

    /*
    403 The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
     */
  Forbidden: res => res.status(403).json({ success: false, error: 'Forbidden' }),
  /*
    404 The server has not found anything matching the Request-URI.
     */
  NotFound: res => res.status(404).json({ success: false, error: 'Not Found' }),

  /*
    500 The server encountered an unexpected condition which prevented it from fulfilling the request.
    */
  InternalServerError: internalError,
}
