
describe('@MENTOR TEST', function(){
  var mentor = require('../lib/mentor.js');
  var _mentor = new mentor.mentor('test','celebroid_test');

  // Prepare the initial lessons
  _mentor.setLabels(['win','draw','loss']);
  _mentor.setState({state: 'dominating',p: 0.2});
  _mentor.setState({state: 'attacking',p: 0.3});
  _mentor.setState({state: 'balanced',p: 0.4});
  _mentor.setState({state: 'defending',p: 0.1});

  _mentor.setTransition({from: 'dominating', to: 'dominating', p:0.4});
  _mentor.setTransition({from: 'dominating', to: 'attack', p:0.4});
  _mentor.setTransition({from: 'dominating', to: 'balanced', p:0.2});

  _mentor.setTransition({from: 'attacking', to: 'dominating', p:0.3});
  _mentor.setTransition({from: 'attacking', to: 'attacking', p:0.5});
  _mentor.setTransition({from: 'attacking', to: 'balanced', p:0.1});
  _mentor.setTransition({from: 'attacking', to: 'defending', p:0.1});

  _mentor.setTransition({from: 'balanced', to: 'balanced', p:0.7});
  _mentor.setTransition({from: 'balanced', to: 'attacking', p:0.1});
  _mentor.setTransition({from: 'balanced', to: 'defending', p:0.2});

  _mentor.setTransition({from: 'defending', to: 'defending', p:0.7});
  _mentor.setTransition({from: 'defending', to: 'balanced', p:0.3});

  _mentor.setEmission('dominating',{label:'win', p:0.7});
  _mentor.setEmission('dominating',{label:'draw', p:0.15});
  _mentor.setEmission('dominating',{label:'loss', p:0.15});

  _mentor.setEmission('attacking',{label:'win', p:0.5});
  _mentor.setEmission('attacking',{label:'draw', p:0.25});
  _mentor.setEmission('attacking',{label:'loss', p:0.25});

  _mentor.setEmission('balanced',{label:'win', p:0.33});
  _mentor.setEmission('balanced',{label:'draw', p:0.33});
  _mentor.setEmission('balanced',{label:'loss', p:0.34});

  _mentor.setEmission('defending',{label:'win', p:0.1});
  _mentor.setEmission('defending',{label:'draw', p:0.6});
  _mentor.setEmission('defending',{label:'loss', p:0.3});

  // Post-test
  describe("After lessons assignment", function(){
    it("should has lessons pre-initialized",function(){
      _mentor.showLessons().length.should.equal(0);
    });
  });


  // Prepare the lessons before testing
  beforeEach(function(done){
    // Reset the lessons
  });

  describe('==> COMPILE MODEL', function(){

    it('Should pass lessons verification',function(done){
      _mentor.verify().should.equal(true);
    });

    it('Compile the model should pass without errors',function(done){
      _mentor.learn().should.not.throw();
    });
  })


  describe('==> LOOSELY TEST PREDICTION', function(){
    it('Dominating 3 matches in a row should not be a defending play', function(done){
      var _bestPlayPattern = _mentor.predictLabel(['win','win','win']);
      _bestPlayPattern.states.indexOf('defending').should.equal(-1);
    })
  })
})