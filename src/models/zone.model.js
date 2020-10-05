module.exports = mongoose => {

    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
    },
        {timestamps: true}
    );

    schema.method("toJSON", function(){

        const {__v, _id, _name, ...object} = this.toObject();

        object.id = _id;

        return object;
    });

    const Zone = mongoose.model("zone", schema);

    return Zone;
};