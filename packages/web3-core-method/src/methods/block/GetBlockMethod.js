/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file GetBlockMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */

import AbstractCallMethod from '../../../lib/methods/AbstractCallMethod';

export default class GetBlockMethod extends AbstractCallMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     *
     * @constructor
     */
    constructor(utils, formatters) {
        super('eth_getBlockByNumber', 2, utils, formatters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractWeb3Module} moduleInstance - The package where the method is called from for example Eth.
     */
    beforeExecution(moduleInstance) {
        if (this.isHash(this.parameters[0])) {
            this.rpcMethod = 'eth_getBlockByHash';
        }

        this.parameters[0] = this.formatters.inputBlockNumberFormatter(this.parameters[0]);

        // Optional second parameter 'returnTransactionObjects' could also be the callback
        if (isFunction(this.parameters[1])) {
            this.callback = this.parameters[1];
            this.parameters[1] = false;
        } else {
            this.parameters[1] = !!this.parameters[1];
        }
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Object}
     */
    afterExecution(response) {
        return this.formatters.outputBlockFormatter(response);
    }
}
